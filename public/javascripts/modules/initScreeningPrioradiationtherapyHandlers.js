import setFieldVisibility from './helpers/setFieldVisibility';

function initScreeningPrioradiationtherapyHandlers() {
  const priorradiationtherapy_1El = $('#priorradiationtherapy_1');

  priorradiationtherapy_1El.change(function () {
    setPriorradiationtherapy_2Visibility();
  });
}

function setPriorradiationtherapy_2Visibility() {
  const checked = $('#priorradiationtherapy_1').is(':checked');
  setFieldVisibility('priorradiationtherapy_2', checked);
  $('#screening-prioradiationtherapy-form').validator('update');
}

export default initScreeningPrioradiationtherapyHandlers;
