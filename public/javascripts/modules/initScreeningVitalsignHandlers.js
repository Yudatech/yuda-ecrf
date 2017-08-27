import setWarningStyle from './helpers/setWarningStyle';

function initScreeningVitalsignHandlers() {
  $('#screening-vitalsign-form').validator({
    delay: 100,
    disable: false
  });
  $('#screening-vitalsign-form').validator('validate');

  // 抗生素
  $('#vitalsign_1').change(function(){
    setErrorElementVisibility();
    setWarningStyle('vitalsign_1');
    setVitalsign9Required();
  });
  setWarningStyle('vitalsign_1');

  // 抗凝血剂
  $('#vitalsign_2').change(function(){
    setErrorElementVisibility();
    setWarningStyle('vitalsign_2');
    setVitalsign9Required();
  });
  setWarningStyle('vitalsign_2');

  setVitalsign9Required();
}

function setVitalsign9Required() {
  const vitalsign_9El = $('#vitalsign_9');
  const extra = vitalsign_9El.data('extra');
  const keys = Object.keys(extra);
  const trueInExtra = Object.keys(extra).find((item) => extra[item] === true);
  const vitalsign_1Value = $('#vitalsign_1').is(':checked');
  const vitalsign_2Value = $('#vitalsign_2').is(':checked');
  if (trueInExtra || vitalsign_1Value || vitalsign_2Value) {
    vitalsign_9El.attr('required', true);
  }
  else {
    vitalsign_9El.removeAttr('required');
  }
  $('#screening-vitalsign-form').validator('validate');
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
