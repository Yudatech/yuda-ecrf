import setFieldVisibility from './helpers/setFieldVisibility';
import setErrorStyle from './helpers/setErrorStyle';
import requireFalseValueValidator from './validators/requireFalseValueValidator';
import requireValidator from './validators/requireValidator';

function initScreeningExclusionHandlers() {
  const exclusion_16El = $('#exclusion_16');

  exclusion_16El.change(function(){
    setExclusion17Visibility();
  });

  $('#screening-exclusion-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequirefalse: requireFalseValueValidator,
      customrequired: requireValidator
    }
  });
  $('#screening-exclusion-form').validator('validate');
}

function setExclusion17Visibility() {
  const checked = $('#exclusion_16').is(':checked');
  setFieldVisibility('exclusion_17', checked);
  $('#screening-exclusion-form').validator('update');
}

export default initScreeningExclusionHandlers;
