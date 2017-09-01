const mongoose = require('mongoose');
const Case = mongoose.model('Case');
const Question = mongoose.model('Question');

const moment = require('moment');
moment.locale('zh-cn');

const getHomeConfig = require('../config/getHomeConfig');
const getCaseStatusConfig = require('../config/common/getCaseStatusConfig');
const getButtonConfig = require('../config/common/getButtonConfig');
const getQuestionStatusConfig = require('../config/getQuestionStatusConfig');

exports.homePage = async (req, res) => {
  const caseStatus = req.query.casestatus;
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
  const questionsFormated = questions.map((item)=> {
    const createDate = moment(item.createdAt).millisecond(0).second(0).hour(0).minute(0).valueOf();
    const nowDate = moment().millisecond(0).second(0).hour(0).minute(0).valueOf();
    const numOfDays = (nowDate - createDate) / 1000 / 60 / 60 / 24;
    return {
      _id: item.case._id,
      questionId: item._id,
      orig: item.orig.username,
      numOfDays,
      status: questionStatusConfig.find((config) => {
        return config.value === item.status;
      }).text
    };
  });

  res.render('home', {
    homeConfig: getHomeConfig(req.user.language),
    cases: casesFormated,
    questions: questionsFormated,
    buttonConfig: getButtonConfig(req.user.language)
  });
};
