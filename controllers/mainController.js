const mongoose = require('mongoose');
const Case = mongoose.model('Case');

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
  res.render('home', {
    homeConfig: getHomeConfig(),
    cases: casesFormated,
    buttonConfig: getButtonConfig()
  });
};
