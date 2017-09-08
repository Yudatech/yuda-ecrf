const minValidator = require('./validators/minValidator');
const maxValidator = require('./validators/maxValidator');

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
      minvalidation: minValidator,
      maxvalidation: maxValidator
    }
  });

  $('#screening-lab-form').validator('validate');
}

export default initScreeningLabHandlers;
