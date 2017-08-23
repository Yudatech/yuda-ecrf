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
const decorationHelper = require('./decorationHelper');

exports.startQuestion = async (req, res) => {
  const caseId = req.query.caseId;
  const table = req.query.table;
  const field = req.query.field;
  const secondaryId = req.query.secondaryId;

  const caseItem = await Case.findById(caseId);

  const questionObj = {
    case: caseId,
    modelname: table,
    fieldname: field,
    orig: req.user._id,
    owner: caseItem.user._id,
    status: 0
  };
  if (secondaryId) {
    questionObj.secondaryid = secondaryId;
  }

  const question = await (new Question(questionObj)).save();

  res.redirect(`/question/${question._id}`);
};

exports.showQuestionPage = async (req, res) => {
  const questionId = req.params.questionId;
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
  const caseId = question.case._id;

  const config = questionHelper.getConfigForQuestion(table, field);
  let fieldConfig = config.formConfigs[field];
  if (fieldConfig.type === 'select') {
    fieldConfig.options = decorationHelper[fieldConfig.optionsGetter]();
  }
  const values = await questionHelper.getValueForQuestion(table, caseId, question.secondaryid);
  const fieldValue = values[field];

  config.formConfigs = Object.keys(config.formConfigs).map((key) => {
    return questionHelper.appendValueToFormConfig(config.formConfigs[key], values[key]);
  });

  fieldConfig = questionHelper.appendValueToFormConfig(fieldConfig, fieldValue);

  const questionConfig = getQuestionConfig();
  questionConfig.questionConfigs.question_status.options = getQuestionStatusConfig();
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
    buttonConfig: getButtonConfig(),
    comments
  });
};

exports.addNewComment = async (req, res) => {
  const questionId = req.params.questionId;
  const newComment = req.body.new_comment;

  await (new Comment({
    question: questionId,
    user: req.user._id,
    text: newComment
  })).save();

  res.redirect(`/question/${questionId}`);
};

exports.updateQuestion = async (req, res) => {
  const questionId = req.params.questionId;
  const questionItem = await Question.findById(questionId);
  const table = questionItem.modelname;
  const field = questionItem.fieldname;
  const caseId = questionItem.case._id;
  const secondaryId = questionItem.secondaryid;
  await questionHelper.updateValueForQuestion(table, caseId, secondaryId, field, req.body[field]);
  await Question.findByIdAndUpdate(questionId, {
    status: req.body.question_status
  });
  res.redirect(`/question/${questionId}`);
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
