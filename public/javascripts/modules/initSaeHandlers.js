import setFieldVisibility from './helpers/setFieldVisibility';
import requireValidator from './validators/requireValidator';

let serializedForm;

function initSaeHandlers() {
  const saecaus_9El = $('#saecaus_9');
  
  saecaus_9El.change(function(){
    setSaecaus10Visibility();
  });

  $('#saecaus_1').change(function(){
    setSaecaus2Visibility();
  });

  $('#saeres_1').change(function(){
    setSaeres2Visibility();
  });

  $('#sae-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequired: requireValidator
    }
  });
  $('#sae-form').validator('validate');
}

function setSaecaus10Visibility() {
  const checked = $('#saecaus_9').is(':checked');
  setFieldVisibility('saecaus_10', checked);
}

function setSaecaus2Visibility() {
  const checked = $('#saecaus_1').is(':checked');
  setFieldVisibility('saecaus_2', checked);
}

function setSaeres2Visibility() {
  const saeres1 = $('#saeres_1').val();
  const checked = saeres1 === '0';
  setFieldVisibility('saeres_2', checked);
}

export default initSaeHandlers;
