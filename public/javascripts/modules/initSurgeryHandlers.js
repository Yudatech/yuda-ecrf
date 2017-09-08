import requireValidator from './validators/requireValidator';
import setFieldVisibility from './helpers/setFieldVisibility';

function initSurgeryHandlers() {
  $('#surgery-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequired: requireValidator
    }
  });
  $('#surgery-form').validator('validate');
}

export default initSurgeryHandlers;
