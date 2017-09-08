import setFieldVisibility from './helpers/setFieldVisibility';
import requireValidator from './validators/requireValidator';

function initScreeningRegionHandlers() {
  const region_4El = $('#region_4');
  
  region_4El.change(function(){
    setRegion5Visibility();
  });
  setRegion5Visibility();

  $('#screening-region-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequired: requireValidator
    }
  });
  $('#screening-region-form').validator('validate');
}

function setRegion5Visibility() {
  const checked = $('#region_4').is(':checked');
  setFieldVisibility('region_5', checked);
}

export default initScreeningRegionHandlers;
