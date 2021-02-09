function setLabelVisibility(fieldId, visible) {
  const containerEl = $(`#${fieldId}`);
  if (visible === true) {
    containerEl.removeClass('hidden');
  }
  else {
    containerEl.addClass('hidden');
  }
}

export default setLabelVisibility;
