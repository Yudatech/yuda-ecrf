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

exports.getQuestionLink = function(table, caseId, formConfig, secondaryId) {
  if (secondaryId === undefined) {
    return `/new/question?table=${table}&caseId=${caseId}&field=${formConfig.name}`;
  }
  else {
    return `/new/question?table=${table}&caseId=${caseId}&field=${formConfig.name}&secondaryId=${secondaryId}`;
  }
};
