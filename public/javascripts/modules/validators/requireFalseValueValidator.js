function requireFalseValueValidator($el) {
  if ($el.is(':checked')) {
    return 'This field require false value.';
  }
}

export default requireFalseValueValidator;
