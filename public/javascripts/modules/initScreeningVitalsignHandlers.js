import setWarningStyle from './helpers/setWarningStyle';

function initScreeningVitalsignHandlers() {
  // 抗生素
  $('#vitalsign_1').change(function(){
    setErrorElementVisibility();
    setWarningStyle('vitalsign_1');
  });
  setWarningStyle('vitalsign_1');

  // 抗凝血剂
  $('#vitalsign_2').change(function(){
    setErrorElementVisibility();
    setWarningStyle('vitalsign_2');
  });
  setWarningStyle('vitalsign_2');
}

function setErrorElementVisibility() {
  const errorEl = $('#screen-vitalsign-error');
  const vitalsign_1Value = $('#vitalsign_1').is(':checked');
  const vitalsign_2Value = $('#vitalsign_2').is(':checked');
  if (vitalsign_1Value || vitalsign_2Value) {
    errorEl.removeClass('hidden');
  }
  else {
    errorEl.addClass('hidden');
  }
}

export default initScreeningVitalsignHandlers;
