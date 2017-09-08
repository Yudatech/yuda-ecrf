import requireTrueValueValidator from './validators/requireTrueValueValidator';

function initScreeningInclusionHandlers() {
  $('#screening-inclusion-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequiretrue: requireTrueValueValidator
    }
  });
  
  $('#screening-inclusion-form').validator().on('invalid.bs.validator', function(){
    $('#screen-inclusion-error-1').removeClass('hidden');
  });
  
  $('#screening-inclusion-form').validator().on('valid.bs.validator', function(){
    $('#screen-inclusion-error-1').addClass('hidden');
  });
  $('#screening-inclusion-form').validator('validate');
}

export default initScreeningInclusionHandlers;
