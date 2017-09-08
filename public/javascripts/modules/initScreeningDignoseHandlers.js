import setFieldVisibility from './helpers/setFieldVisibility';

function initScreeningDignoseHandlers() {
  $('#dignose_4').change(function(){
    setDignose5Visibility();
  });
}

function setDignose5Visibility() {
  const checked = $('#dignose_4').is(':checked');
  setFieldVisibility('dignose_5', checked);
}

export default initScreeningDignoseHandlers;
