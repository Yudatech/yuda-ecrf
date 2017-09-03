exports.createLogMessage = function(user, action, name, caseId) {
  const caseStr = caseId ? ` for case [${caseId}]` : '';
  return `User [${user.userabbr}] requested to [${action}] [${name}]${caseStr}.`;
};


