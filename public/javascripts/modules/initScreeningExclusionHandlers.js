import setFieldVisibility from './helpers/setFieldVisibility';

function initScreeningExclusionHandlers() {
  const exclusion_16El = $('#exclusion_16');

  exclusion_16El.change(function(){
    setExclusion17Visibility();
  });

  $('#screening-exclusion-form').validator({
    delay: 100,
    disable: false
  });
  $('#screening-exclusion-form').validator('validate');
}

function setExclusion17Visibility() {
  const checked = $('#exclusion_16').is(':checked');
  setFieldVisibility('exclusion_17', checked);
}

export default initScreeningExclusionHandlers;
