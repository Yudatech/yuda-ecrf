const getHomeConfig = require('../config/getHomeConfig');

exports.homePage = (req, res) => {
  res.render('home', {
    homeConfig: getHomeConfig()
  });
};
