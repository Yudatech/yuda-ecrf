const mongoose = require('mongoose');
const Case = mongoose.model('Case');

const getHomeConfig = require('../config/getHomeConfig');

exports.homePage = async (req, res) => {
  const cases = await Case.find({
    user: req.user._id
  });
  const casesFormated = cases.map((item) => {
    return {
      _id: item._id,
      subjabbr: item.subjabbr,
      createDate: item.createDate,
      username: item.user.username
    };
  });
  res.render('home', {
    homeConfig: getHomeConfig(),
    cases: casesFormated
  });
};
