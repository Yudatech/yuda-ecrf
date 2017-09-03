exports.createLogMessage = function(user, action, name) {
  return `User [${user.userabbr}] requested to [${action}] [${name}].`;
};


