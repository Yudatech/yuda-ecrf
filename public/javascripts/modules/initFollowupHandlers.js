import requireValidator from './validators/requireValidator';
import setFieldVisibility from './helpers/setFieldVisibility';
import setLabelVisibility from './helpers/setLabelVisibility';

function initFollowupHandlers() {

  $('input[type=radio][name=followup_18]').change(function () {
    setFollowup_18ChildrenVisibility();
  });

  $('#followup-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequired: requireValidator
    }
  });
  $('#followup-form').validator('validate');
}

function setFollowup_18ChildrenVisibility() {
  const value = $('input[type=radio][name=followup_18]:checked').val();
  const checked = parseInt(value) > 0
  setFieldVisibility('followup_18_1', checked);
}

export default initFollowupHandlers;
