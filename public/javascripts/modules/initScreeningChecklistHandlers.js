function initScreeningChecklistHandlers() {
  $('#screeningchecklist-form').validator({
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
  $('#screeningchecklist-form').validator('validate');
}

export default initScreeningChecklistHandlers;
