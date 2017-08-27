function initSurgeryHandlers() {
  const surgery_17El = $('#surgery_17');
  
  surgery_17El.change(function(){
    setSurgery18Visibility();
  });
}

function setSurgery18Visibility() {
  const surgery_17El = $('#surgery_17');
  const surgery_18ContainerEl = $('#surgery_18-container');
  const surgery_18QuestionBtnEl = $('#surgery_18-question-btn');
  const checked = $('#surgery_17').is(':checked');
  if (checked) {
    surgery_18ContainerEl.removeClass('hidden');
    surgery_18QuestionBtnEl.removeClass('hidden');
  }
  else {
    surgery_18ContainerEl.addClass('hidden');
    surgery_18QuestionBtnEl.addClass('hidden');
    $('#surgery_18').val('');
  }
}

export default initSurgeryHandlers;
