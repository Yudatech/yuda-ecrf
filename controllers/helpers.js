const CaseNav = require('../config/CaseNav');

exports.appendCaseIdToCaseNav = function(caseId, lang) {
  const navs = JSON.parse(JSON.stringify(CaseNav));
  if (lang === undefined) {
    lang = 'zh';
  }
  navs.forEach((item) => {
    item.caseId = caseId;
    item.title = item.title[lang];
    if (item.children) {
      item.children.forEach((child) => {
        child.caseId = caseId;
        child.title = child.title[lang];
      });
    }
  });
  return navs;
};

exports.getQuestionLink = function(table, caseId, formConfig, secondaryId) {
  if (secondaryId === undefined) {
    return `/new/question?table=${table}&caseId=${caseId}&field=${formConfig.name}`;
  }
  else {
    return `/new/question?table=${table}&caseId=${caseId}&field=${formConfig.name}&secondaryId=${secondaryId}`;
  }
};
