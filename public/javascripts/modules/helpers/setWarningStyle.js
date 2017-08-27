function setWarningStyle(fieldName) {
  if ($(`#${fieldName}`).is(':checked')) {
    $(`#${fieldName}-container`).addClass('has-warning');
  }
  else {
    $(`#${fieldName}-container`).removeClass('has-warning');
  }
}

export default setWarningStyle;
