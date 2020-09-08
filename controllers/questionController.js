const moment = require('moment');
moment.locale('en');

const mongoose = require('mongoose');
const Question = mongoose.model('Question');
const Case = mongoose.model('Case');
const History = mongoose.model('History');

const getButtonConfig = require('../config/common/getButtonConfig');
const getQuestionConfig = require('../config/getQuestionConfig');
const getQuestionStatusConfig = require('../config/getQuestionStatusConfig');
const getTrueFalseConfig = require('../config/common/getTrueFalseConfig');
const decorationHelper = require('./decorationHelper');

const questionHelper = require('./questionHelper');
const helpers = require('./helpers');

exports.startQuestion = async (req, res) => {
  const caseId = req.query.caseId;
  const linkBase = req.query.linkBase;
  const table = req.query.table;
  const field = req.query.field;
  const secondaryId = req.query.secondaryId;

  const caseItem = await Case.findById(caseId);

  const questionObj = {
    case: caseId,
    modelname: table,
    linkBase,
    fieldname: field,
    orig: req.user._id,
    owner: caseItem.user._id,
    status: 0
  };
  if (secondaryId) {
    questionObj.secondaryid = secondaryId;
  }

  const question = await (new Question(questionObj)).save();

  res.redirect(`/question/${question._id}/?source=create`);
};

exports.showQuestionPage = async (req, res) => {
  const questionId = req.params.questionId;
  const source = req.query.source;

  const question = await Question.findById(questionId);

  const table = question.modelname;
  const field = question.fieldname;
  const linkBase = question.linkBase;
  const caseId = question.case._id;

  const saeSourceConfig = await helpers.getSaeSourceOptions(caseId);
  const aeSourceConfig = await helpers.getAeSourceConfig(caseId, req.user.language);
  const cmSourceConfig = await helpers.getCmSourceConfig(caseId, req.user.language);

  const config = questionHelper.getConfigForQuestion(table, field, req.user.language);
  let fieldConfig = config.formConfigs[field];
  const values = await questionHelper.getValueForQuestion(table, caseId, question.secondaryid);
  const fieldValue = values ? values[field] : null;

  config.formConfigs = Object.keys(config.formConfigs).map((key) => {
    const value = values ? values[key] : null;
    return questionHelper.appendValueAndOptionsToFormConfig(config.formConfigs[key], value, aeSourceConfig, saeSourceConfig, cmSourceConfig);
  });

  fieldConfig = questionHelper.appendValueAndOptionsToFormConfig(fieldConfig, fieldValue, aeSourceConfig, saeSourceConfig, cmSourceConfig);

  const questionConfig = getQuestionConfig(req.user.language);
  questionConfig.questionConfigs.question_status.options = getQuestionStatusConfig(req.user.language);
  questionConfig.questionConfigs.question_status.value = question.status;
  if (questionConfig.questionConfigs.question_status.value === 0 && source === 'update') {
    questionConfig.questionConfigs.question_status.value = 1;
  }
  if (req.user.role === 'cra') {
    questionConfig.questionConfigs.question_status.options = questionConfig.questionConfigs.question_status.options.filter((option) => {
      return option.value !== 2;
    });
  }

  const historyItems = await History.find({
    question: questionId
  }).sort({
    createDate: 'asc'
  });
  const historyList = historyItems.map((item) => {
    const itemObj = item.toObject();
    const obj = {};
    obj.username = itemObj.user.username;
    obj.status = getQuestionStatusConfig(req.user.language).find((questionStatusConfig) => questionStatusConfig.value === itemObj.status).text;
    const fieldType = fieldConfig.type;
    if (fieldType === 'select') {
      obj.value = '';
      const match = decorationHelper[fieldConfig.optionsGetter]().find((option) => option.value === itemObj.content.value);
      if (match) {
        obj.value = match.text;
      }
    }
    else if (fieldType === 'date') {
      obj.value = moment(itemObj.content.value).format('LL');
    }
    else if (fieldType === 'datetime') {
      obj.value = moment(itemObj.content.value).format('LLL');
    }
    else if (fieldType === 'checkbox') {
      itemObj.content.value = itemObj.content.value === 'true' ? true : false;
      obj.value = getTrueFalseConfig(req.user.language).find((option) => option.value === itemObj.content.value).text;
    }
    else {
      obj.value = itemObj.content.value;
    }

    obj.createDate = moment(itemObj.createDate).format('LLL');
    obj.comment = itemObj.comment;
    return obj;
  });

  const firstHistory = {
    createDate: moment(question.createAt).format('LLL'),
    username: question.orig.username,
    comment: null,
    value: null,
    status: getQuestionStatusConfig(req.user.language)[0].text
  };
  historyList.unshift(firstHistory);

  res.render('question', {
    questionId: question._id,
    config,
    questionConfig,
    fieldConfig,
    buttonConfig: getButtonConfig(req.user.language),
    historyList,
    source,
    backInfo: {
      table,
      caseId,
      linkBase,
      secondaryId: question.secondaryid
    }
  });
};

exports.updateQuestion = async (req, res) => {
  const questionId = req.params.questionId;
  const questionItem = await Question.findById(questionId);
  const table = questionItem.modelname;
  const field = questionItem.fieldname;
  const linkBase = questionItem.linkBase;
  const caseId = questionItem.case._id;
  const secondaryId = questionItem.secondaryid;
  await questionHelper.updateValueForQuestion(table, caseId, secondaryId, field, req.body[field]);
  if (typeof req.body[field] === 'string') {
    req.body[field] = req.sanitizeBody(field).escape();
  }
  let questionStatus = req.body.question_status;
  await Question.findByIdAndUpdate(questionId, {
    status: questionStatus
  });

  if (req.body.new_comment !== '') {
    const historyConfig = {
      question: questionId,
      case: caseId,
      user: req.user._id,
      content: {
        value: req.body[field]
      },
      comment: req.sanitizeBody('new_comment').escape(),
      status: req.body.question_status
    };
    await (new History(historyConfig)).save();
  }

  const source = req.body.source;
  if (source === 'create') {
    res.redirect(`/${linkBase}/${caseId}/${secondaryId ? secondaryId : ''}`);
  }
  else {
    res.redirect('/');
  }
};

exports.checkQuestionedFields = async (req, res, next) => {
  const caseId = req.params.caseId;
  let secondaryid = '';
  if (req.params.visitId) {
    secondaryid = req.params.visitId;
  }
  else if (req.param.saeId) {
    secondaryid = req.params.saeId;
  }
  else if (req.param.aeId) {
    secondaryid = req.params.aeId;
  }
  else if (req.param.cmId) {
    secondaryid = req.params.cmId;
  }

  if (req.query.deletequestion) {
    await Question.findByIdAndRemove(req.query.deletequestion);
  }
  const questions = await Question.find({
    case: caseId
  });
  const fields = questions.filter((question) => {
    return question.secondaryid === secondaryid;
  }).map((question) => {
    return question.fieldname;
  });
  res.locals.questionFields = fields;
  next();
};

exports.removeQuestion = async (req, res, next) => {
  const questionId = req.params.questionId;
  await Question.findByIdAndRemove(questionId);
  await History.remove({
    question: questionId
  });
  res.redirect('/');
};
