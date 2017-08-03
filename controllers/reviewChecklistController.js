const CaseNav = require('../config/CaseNav');
const getReviewChecklistConfig = require('../config/getReviewChecklistConfig');

exports.reviewChecklistForm = (req, res) => {
  res.render('review-checklist', {
    caseNav: CaseNav,
    config: getReviewChecklistConfig()
  });
};
