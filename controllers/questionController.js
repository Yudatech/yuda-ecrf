const moment = require('moment');
moment.locale('zh-cn');

const mongoose = require('mongoose');
const Question = mongoose.model('Question');
const Comment = mongoose.model('Comment');
const Case = mongoose.model('Case');

const getButtonConfig = require('../config/common/getButtonConfig');
const getQuestionConfig = require('../config/getQuestionConfig');
const getQuestionStatusConfig = require('../config/getQuestionStatusConfig');

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
  const commentItems = await Comment.find({
    question: questionId
  }).sort({
    createDate: 'asc'
  });
  const comments = commentItems.map((item) => {
    const obj = item.toObject();
    obj.createDate = moment(obj.createDate).format('LLL');
    return obj;
  });

  const table = question.modelname;
  const field = question.fieldname;
  const linkBase = question.linkBase;
  const caseId = question.case._id;

  const saeSourceConfig = await helpers.getSaeSourceOptions(caseId);
  const aeSourceConfig = await helpers.getAeSourceConfig(caseId, req.user.language);

  const config = questionHelper.getConfigForQuestion(table, field, req.user.language);
  let fieldConfig = config.formConfigs[field];
  const values = await questionHelper.getValueForQuestion(table, caseId, question.secondaryid);
  const fieldValue = values[field];

  config.formConfigs = Object.keys(config.formConfigs).map((key) => {
    return questionHelper.appendValueAndOptionsToFormConfig(config.formConfigs[key], values[key], aeSourceConfig, saeSourceConfig);
  });

  fieldConfig = questionHelper.appendValueAndOptionsToFormConfig(fieldConfig, fieldValue, aeSourceConfig, saeSourceConfig);

  const questionConfig = getQuestionConfig(req.user.language);
  questionConfig.questionConfigs.question_status.options = getQuestionStatusConfig(req.user.language);
  questionConfig.questionConfigs.question_status.value = question.status;
  if (req.user.role === 'cra') {
    questionConfig.questionConfigs.question_status.options = questionConfig.questionConfigs.question_status.options.filter((option) => {
      return option.value !== 2;
    });
  }

  res.render('question', {
    questionId: question._id,
    config,
    questionConfig,
    fieldConfig,
    buttonConfig: getButtonConfig(req.user.language),
    comments,
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
  await Question.findByIdAndUpdate(questionId, {
    status: req.body.question_status
  });

  const newComment = req.body.new_comment;
  if (newComment) {
    await (new Comment({
      question: questionId,
      user: req.user._id,
      text: newComment
    })).save();
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
  const questions = await Question.find({
    case: caseId
  });
  const fields = questions.map((question) => {
    return question.fieldname;
  });
  res.locals.questionFields = fields;
  next();
};

exports.removeQuestion = async (req, res, next) => {
  const questionId = req.params.questionId;
  await Question.findByIdAndRemove(questionId);
  await Comment.remove({
    question: questionId
  });
  res.redirect('/');
};
