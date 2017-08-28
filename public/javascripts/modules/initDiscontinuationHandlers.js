function initDiscontinuationHandlers() {
  $('#discontinuetype').change(function(){
    setFormFieldsVisibility();
  });
  setFormFieldsVisibility();
}

function setFormFieldsVisibility() {
  const discontinuetypeValue = $('#discontinuetype').val();
  const allIds = ['discontinuedt', 'discontinuersn_1', 'discontinuersn_2', 'discontinuersn_3', 'discontinuersn_4', 'discontinuersn_5', 'discontinuersn_6', 'discontinuersn_7', 'discontinuersn_8', 'discontinuersn_9'];
  const ids_0 = ['discontinuedt', 'discontinuersn_1', 'discontinuersn_3', 'discontinuersn_4', 'discontinuersn_5', 'discontinuersn_6', 'discontinuersn_7'];
  const ids_1 = ['discontinuedt', 'discontinuersn_6', 'discontinuersn_7', 'discontinuersn_8', 'discontinuersn_9'];
  const ids_2 = ['discontinuedt', 'discontinuersn_2', 'discontinuersn_4', 'discontinuersn_6', 'discontinuersn_7'];

  console.log(typeof discontinuetypeValue);
  if (discontinuetypeValue === '0') {
    showRelevantFields(ids_0, allIds);
  }
  else if (discontinuetypeValue === '1') {
    showRelevantFields(ids_1, allIds);
  }
  else if (discontinuetypeValue === '2') {
    showRelevantFields(ids_2, allIds);
  }
  else {
    showRelevantFields([], allIds);
  }
}

function showRelevantFields(idsToShow, allIds) {
  allIds.forEach((id) => {
    const containerEl = $(`#${id}-container`);
    const questionBtnEl = $(`#${id}-question-btn`);
    if (idsToShow.includes(id)) {
      containerEl.removeClass('hidden');
      questionBtnEl.removeClass('hidden');
    }
    else {
      containerEl.addClass('hidden');
      questionBtnEl.addClass('hidden');
    }
  });
}

export default initDiscontinuationHandlers;
