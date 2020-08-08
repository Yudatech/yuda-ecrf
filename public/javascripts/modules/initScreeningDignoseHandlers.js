import requireValidator from './validators/requireValidator';

function initScreeningDignoseHandlers() {
  $('#screening-dignose-form').validator({
    delay: 100,
    disable: true,
    custom: {
      customrequired: requireValidator
    }
  });
  $('#screening-dignose-form').validator('validate');
}

export default initScreeningDignoseHandlers;
