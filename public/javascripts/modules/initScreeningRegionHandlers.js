function initScreeningRegionHandlers() {
  const region_4El = $('#region_4');
  
  region_4El.change(function(){
    setRegion5Visibility();
  });

  $('#screening-region-form').validator({
    delay: 100,
    disable: false
  });
  $('#screening-region-form').validator('validate');
}

function setRegion5Visibility() {
  const region_4El = $('#region_4');
  const region_5ContainerEl = $('#region_5-container');
  const region_5QuestionBtnEl = $('#region_5-question-btn');
  const checked = $('#region_4').is(':checked');
  if (checked) {
    region_5ContainerEl.removeClass('hidden');
    region_5QuestionBtnEl.removeClass('hidden');
  }
  else {
    region_5ContainerEl.addClass('hidden');
    region_5QuestionBtnEl.addClass('hidden');
    $('#region_5').val('');
  }
}

export default initScreeningRegionHandlers;
