import setFieldVisibility from './helpers/setFieldVisibility';
import requireValidator from './validators/requireValidator';

function initSaeHandlers() {
  $('#aeres_1').change(function () {
    setAeres2Visibility();
  });

  $('#aeorigion').change(function () {
    setAeOrigin1Visibility();
  });

  $('#aeserv').change(function () {
    setErrorElementVisibility();
  });
  $('#aerpt').change(function () {
    setErrorElementVisibility();
  });
  setErrorElementVisibility();

  $('#ae-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequired: requireValidator
    }
  });
  $('#ae-form').validator('validate');
}

function setAeres2Visibility() {
  const aeres1 = $('#aeres_1').val();
  const checked = aeres1 === '0';
  setFieldVisibility('aeres_2', checked);
}

function setAeOrigin1Visibility() {
  const value = $('#aeorigion').val();
  setFieldVisibility('aeorigion_1', value === 'other');
  $('#ae-form').validator('update');
}

function setErrorElementVisibility() {
  const error1El = $('#ae-error-1');

  const aeservValue = $('#aeserv').val();
  const aerptValue = $('#aerpt').is(':checked');

  if (aeservValue == 2 && aerptValue === false) {
    error1El.removeClass('hidden');
  }
  else {
    error1El.addClass('hidden');
  }
}

export default initSaeHandlers;
