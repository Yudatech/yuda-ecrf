function initScreeningInclusionHandlers() {
  $('#screening-inclusion-form').validator({
    delay: 100,
    disable: false
  });
  $('#screening-inclusion-form').validator('validate');
}

export default initScreeningInclusionHandlers;
