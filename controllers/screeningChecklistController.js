const CaseNav = require('../config/CaseNav');
const getScreeningChecklistConfig = require('../config/getScreeningChecklistConfig');

exports.screeningChecklistForm = (req, res) => {
  res.render('screening-checklist', {
    caseNav: CaseNav,
    config: getScreeningChecklistConfig()
  });
};
