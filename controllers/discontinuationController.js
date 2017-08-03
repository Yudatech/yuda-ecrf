const CaseNav = require('../config/CaseNav');
const getDiscontinuationConfig = require('../config/getDiscontinuationConfig');

exports.discontinuationForm = (req, res) => {
  res.render('discontinuation', {
    caseNav: CaseNav,
    config: getDiscontinuationConfig()
  });
};
