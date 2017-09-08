import requireValidator from './validators/requireValidator';
import setFieldVisibility from './helpers/setFieldVisibility';

function initSurgeryHandlers() {
  const surgery_17El = $('#surgery_17');
  
  surgery_17El.change(function(){
    setSurgery18Visibility();
  });

  $('#surgery_19').change(function(){
    setSurgery15161718Visibility();
  });

  $('#surgery-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequired: requireValidator
    }
  });
  $('#surgery-form').validator('validate');
}

function setSurgery18Visibility() {
  const checked = $('#surgery_17').is(':checked');
  setFieldVisibility('surgery_18', checked);
  if (checked === false) {
    $('#surgery_18').val('');
  }
}

function setSurgery15161718Visibility() {
  const checked = $('#surgery_19').is(':checked');
  setFieldVisibility('surgery_15', checked);
  setFieldVisibility('surgery_16', checked);
  if (checked === false) {
    $('#surgery_17').attr('checked', false);
    setFieldVisibility('surgery_17', checked);
    setFieldVisibility('surgery_18', checked);
    $('#surgery_18').val('');
  }
  else {
    setFieldVisibility('surgery_17', checked);
    setSurgery18Visibility();
  }
}

export default initSurgeryHandlers;
