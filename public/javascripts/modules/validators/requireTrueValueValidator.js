function requireTrueValueValidator($el) {
  if (!$el.is(':checked')) {
    return 'This field require true value.';
  }
}

export default requireTrueValueValidator;
