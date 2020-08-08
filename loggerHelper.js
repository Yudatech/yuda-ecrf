exports.createLogMessage = function (user, action, name, caseId, caseStatus) {
  const caseStr = caseId ? ` for case [${caseId}]` : '';
  const caseStatusStr = caseStatus ? ` with status [${caseStatus}]` : '';
  return `User [${user.userabbr}] requested to [${action}] [${name}]${caseStr}${caseStatusStr}.`;
};


