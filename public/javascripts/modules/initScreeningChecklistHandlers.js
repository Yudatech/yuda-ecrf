import requireTrueValueValidator from './validators/requireTrueValueValidator';

function initScreeningChecklistHandlers() {
  $('#screeningchecklist-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequiretrue: requireTrueValueValidator
    }
  });

  $('#screeningchecklist-form').validator().on('invalid.bs.validator', function(){
    $('#screen-checklist-error-1').removeClass('hidden');
  });
  
  $('#screeningchecklist-form').validator().on('valid.bs.validator', function(){
    $('#screen-checklist-error-1').addClass('hidden');
  });
  $('#screeningchecklist-form').validator('validate');
}

export default initScreeningChecklistHandlers;
