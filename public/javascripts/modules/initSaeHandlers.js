import setFieldVisibility from './helpers/setFieldVisibility';

let serializedForm;

function initSaeHandlers() {
  const saecaus_9El = $('#saecaus_9');
  
  saecaus_9El.change(function(){
    setSaecaus10Visibility();
  });
}

function setSaecaus10Visibility() {
  const checked = $('#saecaus_9').is(':checked');
  setFieldVisibility('saecaus_10', checked);
}

export default initSaeHandlers;
