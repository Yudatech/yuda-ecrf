import requireTrueValueValidator from './validators/requireTrueValueValidator';

function initScreeningChecklistHandlers() {
  $('#screeningchecklist-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequiretrue: requireTrueValueValidator
    }
  });
  $('#screeningchecklist-form').validator('validate');
}

export default initScreeningChecklistHandlers;
