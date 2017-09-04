function initHomeHandlers() {
  $('#deleteConfirmModal').on('show.bs.modal', function(event) {
    const button = $(event.relatedTarget);
    const removeType = button.data('removetype');
    const removeId = button.data('removeid');
    const confirmBtn = $('#deleteConfirmModalConfirmBtn');
    if (removeType && removeId) {
      const link = '/remove/' + removeType + '/' + removeId;
      confirmBtn.attr('href', link);
    }
    else {
      confirmBtn.attr('href', '/');
    }
  });
}

export default initHomeHandlers;
