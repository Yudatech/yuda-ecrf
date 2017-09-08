function minValidator($el) {
  if ($el.val() < $el.data('minvalidation')) {
    return 'invalid input';
  }
}

export default minValidator;
