const getSiteTableConfig = require('../config/site/getSiteTableConfig');
const getSiteConfig = require('../config/site/getSiteConfig');

exports.siteForm = (req, res) => {
  res.render('site/site', {
    siteConfig: getSiteConfig()
  });
};

exports.sitesTable = (req, res) => {
  res.render('site/siteTable', {
    siteTableConfig: getSiteTableConfig()
  });
};
