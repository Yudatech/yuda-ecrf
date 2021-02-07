import requireValidator from './validators/requireValidator';
import setFieldVisibility from './helpers/setFieldVisibility';
import setLabelVisibility from './helpers/setLabelVisibility';

function initFollowupHandlers() {

  $('input[type=radio][name=followup_18]').change(function () {
    setFollowup_18ChildrenVisibility();
  });

  $('#followup_20').change(function () {
    setFollowup_20ChildrenVisibility();
  });

  $('#followup_21').change(function () {
    setFollowup_21ChildrenVisibility();
  });

  $('#followup_22').change(function () {
    setFollowup_22ChildrenVisibility();
  });

  $('#followup_23').change(function () {
    setFollowup_23ChildrenVisibility();
  });

  $('#followup_21_5_4').change(function () {
    setFollowup_21_5_4ChildrenVisibility();
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

function setFollowup_20ChildrenVisibility() {
  const value = $('#followup_20').val();
  const checked = value === '1'
  setFieldVisibility('followup_20_1', checked);
  setFieldVisibility('followup_20_2', checked);
}

function setFollowup_21ChildrenVisibility() {
  const value = $('#followup_21').val();
  const checked = value === '1';
  const childrenFields = ['followup_21_1', 'followup_21_2', 'followup_21_3', 'followup_21_4', 'followup_21_5_1', 'followup_21_5_2', 'followup_21_5_3', 'followup_21_5_4'];
  childrenFields.forEach(function (childField) {
    setFieldVisibility(childField, checked);
  })
  setLabelVisibility('followup_21_label_1', checked);
}

function setFollowup_21_5_4ChildrenVisibility() {
  const value = $('#followup_21').val();
  const value2 = $('#followup_21_5_4').is(':checked');
  const checked = value === '1' && value2
  setFieldVisibility('followup_21_5_4_1', checked);
}

function setFollowup_22ChildrenVisibility() {
  const value = $('#followup_22').val();
  const checked = value === '1'
  setFieldVisibility('followup_22_1', checked);
}

function setFollowup_23ChildrenVisibility() {
  const value = $('#followup_23').val();
  const checked = value === '1'
  setFieldVisibility('followup_23_1', checked);
}

export default initFollowupHandlers;
