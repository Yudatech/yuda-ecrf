import requireValidator from './validators/requireValidator';
import setFieldVisibility from './helpers/setFieldVisibility';

function initLifeAssessmentHandlers() {
  const healthcare_1El = $('#healthcare_1');
  healthcare_1El.change(function () {
    setHealthcare_1_1Visibility();
  });

  const healthcare_2El = $('#healthcare_2');
  healthcare_2El.change(function () {
    setHealthcare_2Visibility();
  });

  const healthcare_2_2El = $('#healthcare_2_2');
  healthcare_2_2El.change(function () {
    setHealthcare_2_2Visibility();
  });

  const healthcare_3El = $('#healthcare_3');
  healthcare_3El.change(function () {
    setHealthcare_3Visibility();
  });

  $('#life-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequired: requireValidator
    }
  });
  $('#life-form').validator('validate');
}

function setHealthcare_1_1Visibility() {
  const checked = $('#healthcare_1').is(':checked');
  setFieldVisibility('healthcare_1_1', checked);
  $('#life-form').validator('update');
}

function setHealthcare_2Visibility() {
  const checked = $('#healthcare_2').is(':checked');
  const healthcare_2_2 = $('#healthcare_2_2').val();
  setFieldVisibility('healthcare_2_1', checked);
  setFieldVisibility('healthcare_2_2', checked);
  setFieldVisibility('healthcare_2_3', healthcare_2_2 > 0 && checked);
  $('#life-form').validator('update');
}

function setHealthcare_2_2Visibility() {
  const healthcare_2_2 = $('#healthcare_2_2').val();
  setFieldVisibility('healthcare_2_3', healthcare_2_2 > 0);
  $('#life-form').validator('update');
}

function setHealthcare_3Visibility() {
  const checked = $('#healthcare_3').is(':checked');
  setFieldVisibility('healthcare_3_1', checked);
  $('#life-form').validator('update');
}

export default initLifeAssessmentHandlers;
