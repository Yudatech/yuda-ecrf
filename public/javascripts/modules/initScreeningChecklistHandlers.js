function initScreeningChecklistHandlers() {
  $('#screeningchecklist-form').validator({
    delay: 100,
    disable: false
  });
  $('#screeningchecklist-form').validator('validate');
}

export default initScreeningChecklistHandlers;
