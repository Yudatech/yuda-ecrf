import requireValidator from './validators/requireValidator';

function initCaseFormHandlers(){
  $('#case-form').validator({
    delay: 100,
    disable: true,
    custom: {
      customrequire: requireValidator
    }
  });
  $('#cm-form').validator('validate');
}

export default initCaseFormHandlers;
