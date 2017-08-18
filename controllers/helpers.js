const CaseNav = require('../config/CaseNav');

exports.appendCaseIdToCaseNav = function(caseId) {
  CaseNav.forEach((item) => {
    item.caseId = caseId;
    if (item.children) {
      item.children.forEach((child) => {
        child.caseId = caseId;
      });
    }
  });
  return CaseNav;
};
