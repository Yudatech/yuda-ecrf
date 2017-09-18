function initSitesHandlers() {
  $('#deleteSiteConfirmModal').on('show.bs.modal', function(event) {
    const button = $(event.relatedTarget);
    const removeId = button.data('removeid');
    const confirmBtn = $('#deleteSiteConfirmModalConfirmBtn');
    if (removeId) {
      const link = '/remove/site/' + removeId;
      confirmBtn.attr('href', link);
    }
    else {
      confirmBtn.attr('href', '/');
    }
  });
}

export default initSitesHandlers;
