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
  const comments = await Comment.find({
    question: questionId
  });

  const table = question.modelname;
  const field = question.fieldname;
  const caseId = question.case._id;

  const fieldConfig = questionHelper.getFormConfigForQuestion(table, field);
  const fieldValue = await questionHelper.getFieldValueForQuestion(table, caseId, field, question.secondaryid);

  if (fieldConfig.type === 'date') {
    fieldConfig.value = moment(fieldValue).format('MM/DD/YYYY');
  }
  else if (field === 'aestdtc') {
    fieldConfig.date = {
      name: 'aestdtc_date',
      value: moment(fieldValue).format('MM/DD/YYYY')
    };
    fieldConfig.time = {
      name: 'aestdtc_time',
      value: moment(fieldValue).format('HH:mm')
    };
  }
  else if (field === 'aeeddtc') {
    fieldConfig.date = {
      name: 'aeeddtc_date',
      value: moment(fieldValue).format('MM/DD/YYYY')
    };
    fieldConfig.time = {
      name: 'aeeddtc_time',
      value: moment(fieldValue).format('HH:mm')
    };
  }
  else {
    fieldConfig.value = fieldValue;
  }

  const questionConfig = getQuestionConfig();
  questionConfig.questionConfigs.question_status.options = getQuestionStatusConfig();

  res.render('question', {
    questionId: question._id,
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
