const mongoose = require('mongoose');
const Site = mongoose.model('Site');

const getSiteTableConfig = require('../config/site/getSiteTableConfig');
const getSiteConfig = require('../config/site/getSiteConfig');

exports.siteForm = async (req, res) => {
  console.log(req.params);
  if (req.params.id !== undefined) {
    const siteId = req.params.id;
    // site id is not undefined, edit site

    // query site from db
    const site = await Site.findById(siteId);

    res.render('site/site', {
      siteConfig: getSiteConfig(),
      site: site
    });
  }
  else {
    // otherwise, it's create new site
    res.render('site/site', {
      siteConfig: getSiteConfig(),
      site: {}
    });
  }
};

exports.sitesTable = async (req, res) => {
  const sites = await Site.find();
  res.render('site/siteTable', {
    sites,
    siteTableConfig: getSiteTableConfig()
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
