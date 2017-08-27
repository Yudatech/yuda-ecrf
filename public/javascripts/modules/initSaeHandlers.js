function initSaeHandlers() {
  const saecaus_9El = $('#saecaus_9');
  
  saecaus_9El.change(function(){
    setSurgery18Visibility();
  });
}

function setSurgery18Visibility() {
  const saecaus_9El = $('#saecaus_9');
  const saecaus_10ContainerEl = $('#saecaus_10-container');
  const saecaus_10QuestionBtnEl = $('#saecaus_10-question-btn');
  const checked = $('#saecaus_9').is(':checked');
  if (checked) {
    saecaus_10ContainerEl.removeClass('hidden');
    saecaus_10QuestionBtnEl.removeClass('hidden');
  }
  else {
    saecaus_10ContainerEl.addClass('hidden');
    saecaus_10QuestionBtnEl.addClass('hidden');
    $('#saecaus_10').val('');
  }
}

export default initSaeHandlers;
