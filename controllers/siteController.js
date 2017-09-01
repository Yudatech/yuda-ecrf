const mongoose = require('mongoose');
const Site = mongoose.model('Site');

const getSiteTableConfig = require('../config/site/getSiteTableConfig');
const getSiteConfig = require('../config/site/getSiteConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

exports.siteForm = async (req, res) => {
  let site;
  if (req.params.id !== undefined) {
    const siteId = req.params.id;
    site = await Site.findById(siteId);
  }
  else {
    site = {};
  }
  const config = getSiteConfig(req.user.language);
  Object.keys(config.formConfigs).forEach((key) => {
    config.formConfigs[key].value = site[key];
  });

  res.render('site/site', {
    siteConfig: config,
    buttonConfig: getButtonConfig(req.user.language),
    siteId: site._id
  });
};

exports.sitesTable = async (req, res) => {
  const sites = await Site.find();
  res.render('site/siteTable', {
    sites,
    siteTableConfig: getSiteTableConfig(req.user.language)
  });
};

exports.createSite = async (req, res) => {
  await (new Site(req.body)).save();
  res.redirect('/sites');
};

exports.updateSite = async (req, res) => {
  const siteId = req.params.id;
  await Site.findByIdAndUpdate(siteId, req.body);
  res.redirect('/sites');
};

exports.removeSite = async (req, res) => {
  const siteId = req.params.id;
  await Site.findByIdAndRemove(siteId);
  res.redirect('/sites');
};
