function initVisitHandlers() {
  const param_16El = $('#param_16');
  
  param_16El.change(function(){
    setParam17Visibility();
  });

  $('#visit-form').validator({
    delay: 100,
    disable: false
  });
  $('#visit-form').validator('validate');
}

function setParam17Visibility() {
  const param_16El = $('#param_16');
  const param_17ContainerEl = $('#param_17-container');
  const param_17QuestionBtnEl = $('#param_17-question-btn');
  const checked = $('#param_16').is(':checked');
  if (checked) {
    param_17ContainerEl.removeClass('hidden');
    param_17QuestionBtnEl.removeClass('hidden');
  }
  else {
    param_17ContainerEl.addClass('hidden');
    param_17QuestionBtnEl.addClass('hidden');
    $('#param_17').val('');
  }
}

export default initVisitHandlers;
