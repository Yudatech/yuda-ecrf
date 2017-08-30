import requireTrueValueValidator from './validators/requireTrueValueValidator';

function initScreeningInclusionHandlers() {
  $('#screening-inclusion-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequiretrue: requireTrueValueValidator
    }
  });
  $('#screening-inclusion-form').validator('validate');
}

export default initScreeningInclusionHandlers;
