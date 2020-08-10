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

  const healthcare_3El = $('#healthcare_3');
  healthcare_3El.change(function () {
    setHealthcare_3Visibility();
  });

  const healthcare_4El = $('#healthcare_4');
  healthcare_4El.change(function () {
    setHealthcare_4Visibility();
  });

  const procedure_1El = $('#procedure_1');
  procedure_1El.change(function () {
    setProcedure_1Visibility();
  });

  const procedure_2El = $('#procedure_2');
  procedure_2El.change(function () {
    setProcedure_2Visibility();
  });

  const procedure_3El = $('#procedure_3');
  procedure_3El.change(function () {
    setProcedure_3Visibility();
  });

  const procedure_4El = $('#procedure_4');
  procedure_4El.change(function () {
    setProcedure_4Visibility();
  });

  const complications_1El = $('#complications_1');
  complications_1El.change(function () {
    setComplications_1Visibility();
  });

  const complications_2El = $('#complications_2');
  complications_2El.change(function () {
    setComplications_2Visibility();
  });

  const complications_3El = $('#complications_3');
  complications_3El.change(function () {
    setComplications_3Visibility();
  });

  const complications_4El = $('#complications_4');
  complications_4El.change(function () {
    setComplications_4Visibility();
  });

  const complications_5El = $('#complications_5');
  complications_5El.change(function () {
    setComplications_5Visibility();
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
  setFieldVisibility('healthcare_2_1', checked);
  setFieldVisibility('healthcare_2_2', checked);
  $('#life-form').validator('update');
}

function setHealthcare_3Visibility() {
  const checked = $('#healthcare_3').is(':checked');
  setFieldVisibility('healthcare_3_1', checked);
  $('#life-form').validator('update');
}

function setHealthcare_4Visibility() {
  const checked = $('#healthcare_4').is(':checked');
  setFieldVisibility('healthcare_4_1', checked);
  $('#life-form').validator('update');
}

function setProcedure_1Visibility() {
  const checked = $('#procedure_1').is(':checked');
  setFieldVisibility('procedure_1_1', checked);
  $('#life-form').validator('update');
}

function setProcedure_2Visibility() {
  const checked = $('#procedure_2').is(':checked');
  setFieldVisibility('procedure_2_1', checked);
  $('#life-form').validator('update');
}

function setProcedure_3Visibility() {
  const checked = $('#procedure_3').is(':checked');
  setFieldVisibility('procedure_3_1', checked);
  $('#life-form').validator('update');
}

function setProcedure_4Visibility() {
  const checked = $('#procedure_4').is(':checked');
  setFieldVisibility('procedure_4_1', checked);
  $('#life-form').validator('update');
}

function setComplications_1Visibility() {
  const checked = $('#complications_1').is(':checked');
  setFieldVisibility('complications_1_1', checked);
  $('#life-form').validator('update');
}

function setComplications_2Visibility() {
  const checked = $('#complications_2').is(':checked');
  setFieldVisibility('complications_2_1', checked);
  $('#life-form').validator('update');
}

function setComplications_3Visibility() {
  const checked = $('#complications_3').is(':checked');
  setFieldVisibility('complications_3_1', checked);
  $('#life-form').validator('update');
}

function setComplications_4Visibility() {
  const checked = $('#complications_4').is(':checked');
  setFieldVisibility('complications_4_1', checked);
  $('#life-form').validator('update');
}

function setComplications_5Visibility() {
  const checked = $('#complications_5').is(':checked');
  setFieldVisibility('complications_5_1', checked);
  $('#life-form').validator('update');
}

export default initLifeAssessmentHandlers;
