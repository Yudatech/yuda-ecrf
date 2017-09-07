const mongoose = require('mongoose');
const Case = mongoose.model('Case');
const Question = mongoose.model('Question');
const User = mongoose.model('User');

const moment = require('moment');
moment.locale('zh-cn');

const getHomeConfig = require('../config/getHomeConfig');
const getCaseStatusConfig = require('../config/common/getCaseStatusConfig');
const getButtonConfig = require('../config/common/getButtonConfig');
const getQuestionStatusConfig = require('../config/getQuestionStatusConfig');
const getUtilConfig = require('../config/common/getUtilConfig');

function getCaseListByStatus(caseList, status) {
  return caseList.filter((item) => item.status === status);
}

function getNotFinishedQuestions(questionList) {
  return questionList.filter((item) => item.status !== 2);
}

async function calculateKpis(user) {
  const kpis = {
    finished: null,
    ongoing: null,
    questions: null,
    contribution: null,
    discontinuationRate: null
  };
  let caseList = [];
  let questionList = [];
  const role = user.role;
  if (role === 'cra') {
    caseList = await Case.find({
      user: user._id
    });
    questionList = await Question.find({
      owner: user._id
    });
  }
  else if (role === 'admin') {
    caseList = await Case.find();
    questionList = await Question.find();
  }
  else {
    caseList = await Case.find({
      site: user.site._id
    });
    questionList = await Question.find();
    questionList = questionList.filter((item) => {
      return item.owner.site._id.toString() === user.site._id.toString();
    });
  }

  kpis.finished = getCaseListByStatus(caseList, 'locked').length;
  kpis.ongoing = getCaseListByStatus(caseList, 'open').length + getCaseListByStatus(caseList, 'committed').length + getCaseListByStatus(caseList, 'audited').length;
  kpis.contribution = kpis.finished + '%';
  kpis.discontinuationRate = kpis.finished === 0 ? 0 : (getCaseListByStatus(caseList, 'quit').length * 100 / kpis.finished) + '%';
  kpis.questions = getNotFinishedQuestions(questionList).length;

  return kpis;
}

exports.homePage = async (req, res) => {
  const caseStatus = req.query.casestatus;
  const kpis = await calculateKpis(req.user);
  const role = req.user.role;
  let cases;
  if (role === 'cra') {
    cases = await Case.find({
      user: req.user._id
    });
  }
  else if (role === 'admin') {
    cases = await Case.find();
  }
  else {
    cases = await Case.find({
      site: req.user.site._id
    });
  }
  const caseStatusConfig = getCaseStatusConfig(req.user.language);
  const casesFormated = cases.filter((item) => {
    return caseStatus === undefined || item.status === caseStatus;
  }).map((item) => {
    return {
      _id: item._id,
      subjabbr: item.subjabbr,
      createDate: moment(item.createDate).format('ll'),
      username: item.user.username,
      statusValue: item.status,
      status: caseStatusConfig[item.status].text
    };
  });

  let questions;
  if (role === 'cra') {
    questions = await Question.find({
      owner: req.user._id
    });
  }
  else {
    questions = await Question.find();
    if (role !== 'admin') {
      questions = questions.filter((item) => {
        return item.owner.site._id.toString() === req.user.site._id.toString();
      });
    }
  }
  const questionStatusConfig = getQuestionStatusConfig(req.user.language);
  const users = [];
  const questionsFormated = questions.map((item)=> {
    const createDate = moment(item.createdAt).millisecond(0).second(0).hour(0).minute(0).valueOf();
    const nowDate = moment().millisecond(0).second(0).hour(0).minute(0).valueOf();
    const numOfDays = (nowDate - createDate) / 1000 / 60 / 60 / 24;
    let owner;
    let orig;
    if (item.status === 0) {
      owner = item.owner._id.toString();
      orig = item.owner.username;
      users.push({
        _id: item.owner._id.toString(),
        username: item.owner.username
      });
    }
    else if (item.status === 1) {
      owner = item.orig._id.toString();
      orig = item.orig.username;
      users.push({
        _id: item.orig._id.toString(),
        username: item.orig.username
      });
    }
    else if (item.status === 2) {
      owner = '0';
      orig = '';
    }
    return {
      _id: item.case._id,
      questionId: item._id,
      owner,
      statusValue: questionStatusConfig.find((config) => {
        return config.value === item.status;
      }).value,
      orig,
      numOfDays,
      status: questionStatusConfig.find((config) => {
        return config.value === item.status;
      }).text
    };
  });

  const utilConfig = getUtilConfig(req.user.language);
  users.unshift({
    _id: 'all',
    username: utilConfig.utils.all.text
  });
  questionStatusConfig.unshift({
    value: 'all',
    text: utilConfig.utils.all.text
  });

  res.render('home', {
    homeConfig: getHomeConfig(req.user.language),
    cases: casesFormated,
    questions: questionsFormated,
    buttonConfig: getButtonConfig(req.user.language),
    kpis,
    users,
    questionStatusConfig,
    utilConfig: getUtilConfig(req.user.language)
  });
};
