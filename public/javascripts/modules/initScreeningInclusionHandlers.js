function initScreeningInclusionHandlers() {
  $('#screening-inclusion-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customvalidator: function($el){
        const id = $el.attr('id');
        if ($el.is(':checked') === false) {
          $(`#${id}-container`).addClass('has-error');
        }
        else {
          $(`#${id}-container`).removeClass('has-error');
        }
      }
    }
  });
  $('#screening-inclusion-form').validator('validate');
}

export default initScreeningInclusionHandlers;
