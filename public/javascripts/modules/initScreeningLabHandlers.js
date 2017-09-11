import minValidator from './validators/minValidator';
import maxValidator from './validators/maxValidator';

function initScreeningLabHandlers() {
  const units = $('.yuda-input-unit');
  units.each(function (index) {
    const text = $(this).text();
    const pattern = new RegExp(/(.*)\^(\d*)(\/.*)/);
    //console.log(pattern.exec(text));

    const match = pattern.exec(text);

    if (match && match.length > 3) {
      $(this).html(match[1] + '<sup>' + match[2] + '</sup>' + match[3]);
    }

  });

  $('#screening-lab-form').validator({
    delay: 100,
    disable: false,
    custom: {
      minvalidation: function($el) {
        const elId = $el.attr('id');
        const containerId = `${elId}-container`;
        if (typeof minValidator($el) === 'string') {
          $(`#${containerId}`).addClass('has-warning');
          return 'invalid input';
        }
        else {
          if ($el.data('maxvalidation')) {
            if (typeof maxValidator($el) !== 'string') {
              $(`#${containerId}`).removeClass('has-warning');
            }
          }
          else {
            $(`#${containerId}`).removeClass('has-warning');
          }
        }
      },
      maxvalidation: function($el) {
        const elId = $el.attr('id');
        const containerId = `${elId}-container`;
        if (typeof maxValidator($el) === 'string') {
          $(`#${containerId}`).addClass('has-warning');
          return 'invalid input';
        }
        else {
          if ($el.data('minvalidation')) {
            if (typeof minValidator($el) !== 'string') {
              $(`#${containerId}`).removeClass('has-warning');
            }
          }
          else {
            $(`#${containerId}`).removeClass('has-warning');
          }
        }
      }
    }
  });
  $('#screening-lab-form').validator().on('validate.bs.validator', function(){
    setErrorElementVisibility();
  });
  $('#screening-lab-form').validator('validate');
}

function setErrorElementVisibility() {
  const error1El = $('#screen-lab-error-1');

  const lab_19Value = $('#lab_19').val();

  if (lab_19Value === '' || (parseFloat(lab_19Value) < 35)) {
    error1El.removeClass('hidden');
  }
  else {
    error1El.addClass('hidden');
  }
}

export default initScreeningLabHandlers;
