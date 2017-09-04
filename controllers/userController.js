const mongoose = require('mongoose');
const User = mongoose.model('User');
const Site = mongoose.model('Site');
const promisify = require('es6-promisify');

const getUserTableConfig = require('../config/user/getUserTableConfig');
const getRegisterConfig = require('../config/user/getRegisterConfig');
const getRoleConfig = require('../config/user/getRoleConfig');
const getLoginConfig = require('../config/getLoginConfig');
const getLanguageConfig = require('../config/common/getLanguageConfig');
const getButtonConfig = require('../config/common/getButtonConfig');

exports.loginForm = (req, res) => {
  res.render('login', {
    loginConfig: getLoginConfig('en'),
    buttonConfig: getButtonConfig('en')
  });
};

exports.registerForm = async (req, res) => {
  const sites = await Site.find();
  let user;
  if (req.params.id !== undefined) {
    const userId = req.params.id;
    user = await User.findById(userId);
  }
  else {
    user = {};
  }
  res.render('user/register', {
    sites,
    registerConfig: getRegisterConfig(req.user.language),
    roleConfig: getRoleConfig(req.user.language),
    languageConfig: getLanguageConfig(req.user.language),
    buttonConfig: getButtonConfig(req.user.language),
    userInfo: user
  });
};

exports.validateRegister = async (req, res, next) => {
  req.sanitizeBody('username');
  req.checkBody('username', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
  req.checkBody('password-confirm', 'Confirmed Password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    const sites = await Site.find();
    res.render('user/register', {
      sites,
      registerConfig: getRegisterConfig(req.user.language),
      roleConfig: getRoleConfig(req.user.language),
      languageConfig: getLanguageConfig(req.user.language),
      buttonConfig: getButtonConfig(req.user.language),
      userInfo: req.body
    });
    return; // stop the fn from running
  }
  next();
};

exports.register = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      userabbr: req.body.userabbr,
      site: req.body.site,
      role: req.body.role,
      tel: req.body.tel,
      language: req.body.language
    });
    const register = promisify(User.register, User);
    await register(user, req.body.password);
    res.redirect('/users');
  }
  catch (e) {
    const sites = await Site.find();
    req.flash('error', e.toString());
    res.render('user/register', {
      sites,
      registerConfig: getRegisterConfig(req.user.language),
      roleConfig: getRoleConfig(req.user.language),
      languageConfig: getLanguageConfig(req.user.language),
      buttonConfig: getButtonConfig(req.user.language),
      userInfo: req.body
  });
  }
};

exports.usersTable = async (req, res) => {
  const users = await User.find();
  res.render('user/usersTable', {
    userTableConfig: getUserTableConfig(req.user.language),
    users
  });
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  await User.findByIdAndUpdate(userId, req.body);
  res.redirect('/users');
};

exports.removeUser = async (req, res) => {
  const userId = req.params.id;
  await User.findByIdAndRemove(userId);
  res.redirect('/users');
};

exports.setUserLang = async (req, res) => {
  const userId = req.user._id;
  const lang = req.params.lang;
  await User.findByIdAndUpdate(userId, {
    language: lang
  });
  req.logout();
  res.redirect('/login');
};
