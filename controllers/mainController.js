const mongoose = require('mongoose');
const Case = mongoose.model('Case');
const Question = mongoose.model('Question');

const moment = require('moment');
moment.locale('zh-cn');

const getHomeConfig = require('../config/getHomeConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

exports.homePage = async (req, res) => {
  const cases = await Case.find({
    user: req.user._id
  });
  const casesFormated = cases.map((item) => {
    return {
      _id: item._id,
      subjabbr: item.subjabbr,
      createDate: moment(item.createDate).format('ll'),
      username: item.user.username
    };
  });

  const questions = await Question.find({
    owner: req.user._id
  });
  const questionsFormated = questions.map((item)=> {
    const createDate = moment(item.createDate).millisecond(0).second(0).hour(0).minute(0).valueOf();
    const nowDate = moment().millisecond(0).second(0).hour(0).minute(0).valueOf();
    const numOfDays = (nowDate - createDate) / 1000 / 60 / 60 / 24;
    return {
      _id: item.case._id,
      questionId: item._id,
      orig: item.orig.username,
      numOfDays
    };
  });

  res.render('home', {
    homeConfig: getHomeConfig(),
    cases: casesFormated,
    questions: questionsFormated,
    buttonConfig: getButtonConfig()
  });
};
