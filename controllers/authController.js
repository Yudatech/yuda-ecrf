const passport = require('passport');

const mongoose = require('mongoose');
const Case = mongoose.model('Case');

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
