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
    const uncheckedList = [];
    $('#screening-inclusion-form').find(':checkbox').each(function(index, el){
      if ($(el).is(':checked') === false) {
        uncheckedList.push(el);
      }
    });
    if (uncheckedList.length === 0) {
      $('#screen-inclusion-error-1').addClass('hidden');
    }
  });
  $('#screening-inclusion-form').validator('validate');
}

export default initScreeningInclusionHandlers;
