import setWarningStyle from './helpers/setWarningStyle';

function initScreeningConmedHandlers() {
  // 抗生素
  $('#conmed_1').change(function(){
    setErrorElementVisibility();
    setWarningStyle('conmed_1');
  });
  setWarningStyle('conmed_1');

  // 抗凝血剂
  $('#conmed_2').change(function(){
    setErrorElementVisibility();
    setWarningStyle('conmed_2');
  });
  setWarningStyle('conmed_2');

  // 激素药物
  $('#conmed_4').change(function(){
    setErrorElementVisibility();
    setWarningStyle('conmed_4');
  });
  setWarningStyle('conmed_4');
}

function setErrorElementVisibility() {
  const errorEl = $('#screen-conmed-error');
  const conmed_1Value = $('#conmed_1').is(':checked');
  const conmed_2Value = $('#conmed_2').is(':checked');
  const conmed_4Value = $('#conmed_4').is(':checked');
  if (conmed_1Value || conmed_2Value || conmed_4Value) {
    errorEl.removeClass('hidden');
  }
  else {
    errorEl.addClass('hidden');
  }
}

export default initScreeningConmedHandlers;
