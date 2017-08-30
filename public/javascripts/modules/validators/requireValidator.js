function requireValidator($el) {
  if (!$el.val()) {
    return 'This field is required!';
  }
}

export default requireValidator;
