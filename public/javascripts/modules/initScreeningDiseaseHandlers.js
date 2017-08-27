function initScreeningDiseaseHandlers() {
  const disease_8El = $('#disease_8');
  
  disease_8El.change(function(){
    setDisease9Visibility();
  });
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

export default initScreeningDiseaseHandlers;
