import setWarningStyle from './helpers/setWarningStyle';

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
    disable: false
  });
  $('#screening-disease-form').validator('validate');
}

function setDisease9Visibility() {
  const disease_8El = $('#disease_8');
  const disease_9ContainerEl = $('#disease_9-container');
  const disease_9QuestionBtnEl = $('#disease_9-question-btn');
  const checked = $('#disease_8').is(':checked');
  if (checked) {
    disease_9ContainerEl.removeClass('hidden');
    disease_9QuestionBtnEl.removeClass('hidden');
  }
  else {
    disease_9ContainerEl.addClass('hidden');
    disease_9QuestionBtnEl.addClass('hidden');
    $('#disease_9').val('');
  }
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
