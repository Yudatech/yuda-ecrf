import setFieldVisibility from './helpers/setFieldVisibility';

function initScreeningPrioradiationtherapyHandlers() {
  const priorradiationtherapy_1El = $('#priorradiationtherapy_1');

  priorradiationtherapy_1El.change(function () {
    setPriorradiationtherapy_2Visibility();
  });
}

function setPriorradiationtherapy_2Visibility() {
  const value = $('#priorradiationtherapy_1').val();
  const checked = value === '0';
  setFieldVisibility('priorradiationtherapy_2', checked);
  $('#screening-prioradiationtherapy-form').validator('update');
}

export default initScreeningPrioradiationtherapyHandlers;
