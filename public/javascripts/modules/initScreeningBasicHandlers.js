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
  $('.input-group.date').datepicker('setEndDate', new Date());
  $('.input-group.date').datepicker('setStartDate', extra.start);

  $('#screening-basic-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrange: function($el) {
        const value = $el.val();
        const currentYear = new Date().getFullYear();
        const age = currentYear - value;
        if (age <= 18 || age >=80) {
          $('#screen-basic-error-1').removeClass('hidden');
          return 'invalid input';
        }
        else {
          $('#screen-basic-error-1').addClass('hidden');
        }
      }
    }
  });
  $('#screening-basic-form').validator('validate');
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
