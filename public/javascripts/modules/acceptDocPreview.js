function acceptDocPreview(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
        $('#accept-doc-preview')
          .attr('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

export default acceptDocPreview;
