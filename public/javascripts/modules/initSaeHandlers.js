import setFieldVisibility from './helpers/setFieldVisibility';

function initSaeHandlers() {
  const saecaus_9El = $('#saecaus_9');
  
  saecaus_9El.change(function(){
    setSurgery18Visibility();
  });
}

function setSurgery18Visibility() {
  const checked = $('#saecaus_9').is(':checked');
  setFieldVisibility('saecaus_9', checked);
}

export default initSaeHandlers;
