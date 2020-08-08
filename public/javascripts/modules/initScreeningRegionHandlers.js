import requireValidator from './validators/requireValidator';

function initScreeningRegionHandlers() {
  $('#screening-region-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequired: requireValidator
    }
  });
  $('#screening-region-form').validator('validate');
}

export default initScreeningRegionHandlers;
