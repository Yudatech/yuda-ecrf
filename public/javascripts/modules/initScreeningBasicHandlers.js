function initScreeningBasicHandlers() {
  const heightEl = $('#height');
  const weightEl = $('#weight');

  heightEl.on('input', function(){
    setErrorElementVisibility();
  });

  weightEl.on('input', function(){
    setErrorElementVisibility();
  });

  setErrorElementVisibility();

  const extra = $('#screeningdate').data('extra');
  console.log(extra);
  $('.input-group.date').datepicker('setEndDate', new Date());
  $('.input-group.date').datepicker('setStartDate', extra.start);
}

function setErrorElementVisibility() {
  const errorEl = $('#screen-basic-error');
  let heightValue = $('#height').val();
  const weightValue = $('#weight').val();
  if (heightValue !== '' && weightValue !== '') {
    const bmi = weightValue / heightValue / heightValue * 10000;
    if (bmi > 35) {
      errorEl.removeClass('hidden');
    }
    else {
      errorEl.addClass('hidden');
    }
  }
  else {
    errorEl.addClass('hidden');
  }
}

export default initScreeningBasicHandlers;
