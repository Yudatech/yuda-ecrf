const passport = require('passport');

const mongoose = require('mongoose');
const Case = mongoose.model('Case');
const Question = mongoose.model('Question');

const getCaseStatusConfig = require('../config/common/getCaseStatusConfig');
const { getQuestionLink } = require('./helpers');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
});

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/login');
};

exports.isLoggedIn = (req, res, next) => {
  // first check if the user is authenticated
  if (req.isAuthenticated()) {
    next(); // carry on! They are logged in!
    return;
  }
  res.redirect('/login');
};

exports.checkCasePermission = async (req, res, next) => {
  const caseId = req.params.caseId;
  const user = req.user;
  const caseItem = await Case.findById(caseId);
  if (user.role === 'cra') {
    if (caseItem.user._id.toString() === user._id.toString()) {
      next();
    }
    else {
      req.flash('error', `You do not have permission to case ${caseId}`);
      res.redirect('back');
    }
  }
  else if (user.role === 'admin') {
    next();
  }
  else {
    if (user.site._id.toString() === caseItem.user.site._id.toString()) {
      next();
    }
    else {
      req.flash('error', `You do not have permission to case ${caseId}`);
      res.redirect('back');
    }
  }
};

exports.checkCaseStatus = async (req, res, next) => {
  const caseId = req.params.caseId;
  const caseItem = await Case.findById(caseId);
  const method = req.method.toLowerCase();
  if (method === 'get') {
    res.locals.case = caseItem;
    res.locals.caseStatusText = getCaseStatusConfig(req.user.language);
    next();
  }
  else if (method === 'post') {
    if (caseItem.status !== 'open' && req.user.role !== 'admin') {
      req.flash('error', `Case ${caseId} status is not open anymore, you can not modify it.`);
      res.redirect('back');
    }
    else {
      next();
    }
  }
  else {
    res.redirect('back');
  }
};

exports.checkQuestionStatus = async (req, res, next) => {
  const questionId = req.params.questionId;
  const questionItem = await Question.findById(questionId);
  const method = req.method.toLowerCase();
  if (method === 'post' && questionItem.status === 2) {
    req.flash('error', `Question is completed, you can not modify it.`);
    res.redirect('back');
  }
  else {
    if (method === 'get' || method === 'post') {
      if (questionItem && questionItem.case) {
        const caseId = questionItem.case;
        const caseItem = await Case.findById(caseId);
        res.locals.case = caseItem;
      }
    }
    next();
  }
};

exports.checkQuestionPermission = async (req, res, next) => {
  const questionId = req.params.questionId;
  const user = req.user;
  const questionItem = await Question.findById(questionId);
  if (user.role === 'cra') {
    if (questionItem.owner._id.toString() === user._id.toString()) {
      next();
    }
    else {
      req.flash('error', `You do not have permission to this query.`);
      res.redirect('back');
    }
  }
  else if (user.role === 'admin') {
    next();
  }
  else {
    if (user.site._id.toString() === questionItem.owner.site._id.toString()) {
      next();
    }
    else {
      req.flash('error', `You do not have permission to this query`);
      res.redirect('back');
    }
  }
};
