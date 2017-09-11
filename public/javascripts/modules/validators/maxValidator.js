function maxValidator($el) {
  if ($el.val() === '' || (parseFloat($el.val()) > $el.data('maxvalidation'))) {
    return 'invalid input';
  }
}

export default maxValidator;
