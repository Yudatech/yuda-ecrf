function setFieldVisibility(fieldId, visible) {
  const containerEl = $(`#${fieldId}-container`);
  const questionBtnEl = $(`#${fieldId}-question-btn`);
  if (visible === true) {
    containerEl.removeClass('hidden');
    questionBtnEl.removeClass('hidden');
  }
  else {
    containerEl.addClass('hidden');
    questionBtnEl.addClass('hidden');
  }
}

export default setFieldVisibility;
