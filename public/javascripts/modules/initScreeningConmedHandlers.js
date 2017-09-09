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

  $('#conmed_3').change(function(){
    setErrorElementVisibility();
    setWarningStyle('conmed_3');
  });
  setWarningStyle('conmed_3');

  // 激素药物
  $('#conmed_4').change(function(){
    setErrorElementVisibility();
    setWarningStyle('conmed_4');
  });
  setWarningStyle('conmed_4');
  setErrorElementVisibility();

  $('#conmed_5').change(function(){
    setErrorElementVisibility();
    setWarningStyle('conmed_5');
  });
  setWarningStyle('conmed_5');

  setErrorElementVisibility();
}

function setErrorElementVisibility() {
  const errorEl1 = $('#screen-conmed-error-1');
  const errorEl2 = $('#screen-conmed-error-2');
  const conmed_1Value = $('#conmed_1').is(':checked');
  const conmed_2Value = $('#conmed_2').is(':checked');
  const conmed_3Value = $('#conmed_3').is(':checked');
  const conmed_4Value = $('#conmed_4').is(':checked');
  const conmed_5Value = $('#conmed_5').is(':checked');
  if (conmed_1Value || conmed_2Value || conmed_4Value) {
    errorEl1.removeClass('hidden');
  }
  else {
    errorEl1.addClass('hidden');
  }

  if (conmed_1Value || conmed_2Value || conmed_3Value || conmed_4Value || conmed_5Value) {
    errorEl2.removeClass('hidden');
  }
  else {
    errorEl2.addClass('hidden');
  }
}

export default initScreeningConmedHandlers;
