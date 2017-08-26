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
}

function setErrorElementVisibility() {
  const errorEl = $('#screen-basic-error');
  let heightValue = $('#height').val();
  const weightValue = $('#weight').val();
  console.log(heightValue);
  console.log(weightValue);
  if (heightValue !== '' && weightValue !== '') {
    const bmi = weightValue / heightValue / heightValue * 10000;
    if (bmi > 35) {
      errorEl.removeClass('hidden');
      errorEl.addClass('show');
    }
    else {
      errorEl.removeClass('show');
      errorEl.addClass('hidden');
    }
  }
  else {
    errorEl.removeClass('show');
    errorEl.addClass('hidden');
  }
}

export default initScreeningBasicHandlers;
