import setWarningStyle from './helpers/setWarningStyle';
import setFieldVisibility from './helpers/setFieldVisibility';
import requireValidator from './validators/requireValidator';

function initScreeningDiseaseHandlers() {
  // 其他疾病 checkbox
  $('#disease_8').change(function(){
    setDisease9Visibility();
  });

  // 心脏病
  $('#disease_6').change(function(){
    setErrorElementVisibility();
    setWarningStyle('disease_6');
  });
  setWarningStyle('disease_6');

  // 较大腹部手术史
  $('#disease_7').change(function(){
    setErrorElementVisibility();
    setWarningStyle('disease_7');
  });
  setWarningStyle('disease_7');

  $('#screening-disease-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequired: requireValidator
    }
  });
  $('#screening-disease-form').validator('validate');
  setErrorElementVisibility();
}

function setDisease9Visibility() {
  const checked = $('#disease_8').is(':checked');
  setFieldVisibility('disease_9', checked);
}

function setErrorElementVisibility() {
  const errorEl = $('#screen-disease-error');
  const disease_6Value = $('#disease_6').is(':checked');
  const disease_7Value = $('#disease_7').is(':checked');
  if (disease_6Value || disease_7Value) {
    errorEl.removeClass('hidden');
  }
  else {
    errorEl.addClass('hidden');
  }
}

export default initScreeningDiseaseHandlers;
