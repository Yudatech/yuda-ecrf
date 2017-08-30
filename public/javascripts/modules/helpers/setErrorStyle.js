function setErrorStyle(fieldName, show) {
  if (show) {
    $(`#${fieldName}-container`).addClass('has-error');
  }
  else {
    $(`#${fieldName}-container`).removeClass('has-error');
  }
}

export default setErrorStyle;
