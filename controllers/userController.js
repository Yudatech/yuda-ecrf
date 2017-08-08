const mongoose = require('mongoose');
const User = mongoose.model('User');
const Site = mongoose.model('Site');
const promisify = require('es6-promisify');

const getUserTableConfig = require('../config/user/getUserTableConfig');
const getRegisterConfig = require('../config/user/getRegisterConfig');
const getRoleConfig = require('../config/user/getRoleConfig');

exports.loginForm = (req, res) => {
  res.render('login', {title: 'Login'});
};

exports.registerForm = async (req, res) => {
  const sites = await Site.find();
  res.render('user/register', {
    sites,
    registerConfig: getRegisterConfig(),
    roleConfig: getRoleConfig(),
    user: {}
  });
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name!').notEmpty();
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
    req.flash('error', errors.map( (err) => err.msg));
    res.render('register', {title: 'Register', body: req.body, flashes: req.flash()});
    return; // stop the fn from running
  }
  next(); // there were no errors!
};

exports.register = async (req, res) => {
  const user = new User({email: req.body.email, name: req.body.name, isAdmin: req.body.isAdmin});
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  res.redirect('/users');
};

exports.usersTable = async (req, res) => {
  const users = await User.find();
  res.render('user/usersTable', {
    userTableConfig: getUserTableConfig(),
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
