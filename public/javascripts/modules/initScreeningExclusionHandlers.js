function initScreeningExclusionHandlers() {
  const exclusion_16El = $('#exclusion_16');

  exclusion_16El.change(function(){
    setExclusion17Visibility();
  });
}

function setExclusion17Visibility() {
  const exclusion_16El = $('#exclusion_16');
  const exclusion_17ContainerEl = $('#exclusion_17-container');
  const exclusion_17QuestionBtnEl = $('#exclusion_17-question-btn');
  const checked = $('#exclusion_16').is(':checked');
  if (checked) {
    exclusion_17ContainerEl.removeClass('hidden');
    exclusion_17QuestionBtnEl.removeClass('hidden');
  }
  else {
    exclusion_17ContainerEl.addClass('hidden');
    exclusion_17QuestionBtnEl.addClass('hidden');
    $('#exclusion_17').val('');
  }
}

export default initScreeningExclusionHandlers;
