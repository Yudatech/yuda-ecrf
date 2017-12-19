import setFieldVisibility from './helpers/setFieldVisibility';
import requireValidator from './validators/requireValidator';

function initScreeningDignoseHandlers() {
  $('#dignose_4').change(function(){
    setDignose5Visibility();
  });

  $('#screening-dignose-form').validator({
    delay: 100,
    disable: true,
    custom: {
      customrequired: requireValidator
    }
  });
  $('#screening-dignose-form').validator('validate');
}

function setDignose5Visibility() {
  const checked = $('#dignose_4').is(':checked');
  setFieldVisibility('dignose_5', checked);
}

export default initScreeningDignoseHandlers;
