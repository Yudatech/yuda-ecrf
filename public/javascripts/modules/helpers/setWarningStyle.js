function setWarningStyle(fieldName, reversed) {
  let checked = $(`#${fieldName}`).is(':checked');
  if (reversed === true) {
    checked = !checked;
  }
  if (checked) {
    $(`#${fieldName}-container`).addClass('has-warning');
  }
  else {
    $(`#${fieldName}-container`).removeClass('has-warning');
  }
}

export default setWarningStyle;
