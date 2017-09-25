import requireValidator from './validators/requireValidator';
import setFieldVisibility from './helpers/setFieldVisibility';

function initScreeningAssistantHandlers() {
  $('#assistant_1').change(function(){
    setAssistant2Visibility();
  });

  $('#assistant_3').change(function(){
    setAssistant4Visibility();
  });

  $('#assistant_5').change(function(){
    setAssistant6Visibility();
  });

  $('#screening-assistant-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequired: requireValidator
    }
  });
  $('#screening-assistant-form').validator('validate');
}

function setAssistant2Visibility() {
  const value = $('#assistant_1').val();
  if (value === '1' || value === '2') {
    setFieldVisibility('assistant_2', true);
  }
  else {
    setFieldVisibility('assistant_2', false);
  }
}

function setAssistant4Visibility() {
  const value = $('#assistant_3').val();
  if (value === '1' || value === '2') {
    setFieldVisibility('assistant_4', true);
  }
  else {
    setFieldVisibility('assistant_4', false);
  }
}

function setAssistant6Visibility() {
  const value = $('#assistant_5').val();
  if (value === '1' || value === '2') {
    setFieldVisibility('assistant_6', true);
  }
  else {
    setFieldVisibility('assistant_6', false);
  }
}

export default initScreeningAssistantHandlers;
