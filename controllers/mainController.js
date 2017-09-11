const mongoose = require('mongoose');
const Case = mongoose.model('Case');
const Question = mongoose.model('Question');
const User = mongoose.model('User');
const Site = mongoose.model('Site');

const moment = require('moment');
moment.locale('zh-cn');

const getHomeConfig = require('../config/getHomeConfig');
const getSearchConfig = require('../config/getSearchConfig');
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

exports.searchPage = async (req, res) => {
  const role = req.user.role;
  let cases;
  let craList;
  let siteList;
  if (role === 'cra') {
    cases = await Case.find({
      user: req.user._id
    });
    craList = [{
      id: req.user._id.toString(),
      text: req.user.username
    }];
    siteList = [{
      id: req.user.site._id.toString(),
      text: req.user.site.sitename
    }];
  }
  else if (role === 'admin') {
    cases = await Case.find().sort({
      _id: 'asc'
    });
    const craItems = await User.find({
      role: 'cra'
    });
    craList = craItems.map((user) => {
      return {
        id: user._id.toString(),
        text: user.username
      };
    });
    const siteItems = await Site.find();
    siteList = siteItems.map((site) => {
      return {
        id: site._id.toString(),
        text: site.sitename
      };
    });
  }
  else {
    cases = await Case.find({
      site: req.user.site._id
    }).sort({
      _id: 'asc'
    });
    const craItems = await User.find({
      role: 'cra',
      site: req.user.site._id
    });
    craList = craItems.map((user) => {
      return {
        id: user._id.toString(),
        text: user.username
      };
    });
    siteList = [{
      id: req.user.site._id.toString(),
      text: req.user.site.sitename
    }];
  }
  const caseStatusConfig = getCaseStatusConfig(req.user.language);
  const casesFormated = cases.map((item) => {
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
    }).sort({
      case: 'asc'
    });
  }
  else {
    questions = await Question.find().sort({
      case: 'asc'
    });
    if (role !== 'admin') {
      questions = questions.filter((item) => {
        return item.owner.site._id.toString() === req.user.site._id.toString();
      });
    }
  }
  const questionStatusConfig = getQuestionStatusConfig(req.user.language);
  const questionsFormated = questions.map((item)=> {
    const createDate = moment(item.createdAt).millisecond(0).second(0).hour(0).minute(0).valueOf();
    const nowDate = moment().millisecond(0).second(0).hour(0).minute(0).valueOf();
    const numOfDays = (nowDate - createDate) / 1000 / 60 / 60 / 24;
    let execId;
    let exec;
    if (item.status === 0) {
      execId = item.owner._id.toString();
      exec = item.owner.username;
    }
    else if (item.status === 1) {
      execId = item.orig._id.toString();
      exec = item.orig.username;
    }
    else if (item.status === 2) {
      execId = '0';
      exec = '';
    }
    return {
      _id: item.case._id,
      questionId: item._id,
      execId,
      exec,
      statusValue: questionStatusConfig.find((config) => {
        return config.value === item.status;
      }).value,
      origId: item.orig._id.toString(),
      orig: item.orig.username,
      numOfDays,
      status: questionStatusConfig.find((config) => {
        return config.value === item.status;
      }).text
    };
  });

  const utilConfig = getUtilConfig(req.user.language);
  const caseStatusList = [];
  caseStatusList.push({
    value: utilConfig.utils.all.name,
    text: utilConfig.utils.all.text
  });
  Object.keys(caseStatusConfig).forEach((key) => {
    caseStatusList.push(caseStatusConfig[key]);
  });

  res.render('search', {
    craList,
    siteList,
    searchConfig: getSearchConfig(req.user.language),
    caseStatusList,
    cases: casesFormated,
    questions: questionsFormated,
    buttonConfig: getButtonConfig(req.user.language),
    utilConfig: getUtilConfig(req.user.language)
  });
};

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
    let execId;
    let exec;
    if (item.status === 0) {
      execId = item.owner._id.toString();
      exec = item.owner.username;
      const match = users.find((userItem) => userItem._id === execId);
      if (!match) {
        users.push({
          _id: item.owner._id.toString(),
          username: item.owner.username
        });
      }
    }
    else if (item.status === 1) {
      execId = item.orig._id.toString();
      exec = item.orig.username;
      const match = users.find((userItem) => userItem._id === execId);
      if (!match) {
        users.push({
          _id: item.owner._id.toString(),
          username: item.owner.username
        });
      }
    }
    else if (item.status === 2) {
      execId = '0';
      exec = '';
    }
    return {
      _id: item.case._id,
      questionId: item._id,
      exec,
      execId,
      statusValue: questionStatusConfig.find((config) => {
        return config.value === item.status;
      }).value,
      orig: item.orig.username,
      origId: item.orig._id.toString(),
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
