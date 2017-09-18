function initUsersHandlers() {
  $('#deleteUserConfirmModal').on('show.bs.modal', function(event) {
    const button = $(event.relatedTarget);
    const removeId = button.data('removeid');
    const confirmBtn = $('#deleteUserConfirmModalConfirmBtn');
    if (removeId) {
      const link = '/remove/user/' + removeId;
      confirmBtn.attr('href', link);
    }
    else {
      confirmBtn.attr('href', '/');
    }
  });
}

export default initUsersHandlers;
