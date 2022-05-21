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

  $('#followup_33').change(function () {
    setFollowup_33ChildrenVisibility();
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

  $('#followup_26').change(function () {
    setFollowup_26ChildrenVisibility();
  });

  $('#followup_27').change(function () {
    setFollowup_27ChildrenVisibility();
  });

  $('#followup_28').change(function () {
    setFollowup_28ChildrenVisibility();
  });

  $('#followup_31').change(function () {
    setFollowup_31ChildrenVisibility();
  });

  $('#followup_32').change(function () {
    setFollowup_32ChildrenVisibility();
  });

  $('#followup_32_8').change(function () {
    setFollowup_32_8ChildrenVisibility();
  });

  $('#followup_26_14').change(function () {
    setFollowup_26_14ChildrenVisibility();
  });

  $('#followup_21_5_4').change(function () {
    setFollowup_21_5_4ChildrenVisibility();
  });

  $('#followup-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequired: requireValidator,
    },
  });
  $('#followup-form').validator('validate');
}

function setFollowup_18ChildrenVisibility() {
  const value = $('input[type=radio][name=followup_18]:checked').val();
  const checked = parseInt(value) > 0;
  setFieldVisibility('followup_18_1', checked);
}

function setFollowup_20ChildrenVisibility() {
  const value = $('#followup_20').val();
  const checked = value === '1';
  setFieldVisibility('followup_20_1', checked);
  setLabelVisibility('followup_20_1_row', checked);
  setFieldVisibility('followup_20_2', checked);
  setLabelVisibility('followup_20_2_row', checked);
  setFieldVisibility('followup_20_3', checked);
  setLabelVisibility('followup_20_3_row', checked);
  setFieldVisibility('followup_20_4', checked);
  setLabelVisibility('followup_20_4_row', checked);
  setFieldVisibility('followup_20_5', checked);
  setFieldVisibility('followup_20_6', checked);
  setFieldVisibility('followup_20_7', checked);
  setFieldVisibility('followup_20_8', checked);
}

function setFollowup_33ChildrenVisibility() {
  const value = $('#followup_33').val();
  const checked = value === '0';
  setFieldVisibility('followup_33_1', checked);
  setLabelVisibility('followup_33_1_row', checked);
}

function setFollowup_21ChildrenVisibility() {
  const value = $('#followup_21').val();
  const checked = value === '1';
  const childrenFields = [
    'followup_21_1',
    'followup_21_2',
    'followup_21_3',
    'followup_21_4',
    'followup_21_5_1',
    'followup_21_5_2',
    'followup_21_5_5',
    'followup_21_5_3',
    'followup_21_5_4',
  ];
  childrenFields.forEach(function (childField) {
    setFieldVisibility(childField, checked);
    setLabelVisibility(`${childField}_row`, checked);
  });
  setLabelVisibility('followup_21_label_1', checked);
  setFollowup_21_5_4ChildrenVisibility();
}

function setFollowup_21_5_4ChildrenVisibility() {
  const value = $('#followup_21').val();
  const value2 = $('#followup_21_5_4').is(':checked');
  const checked = value === '1' && value2;
  setFieldVisibility('followup_21_5_4_1', checked);
  setLabelVisibility('followup_21_5_4_1_row', checked);
}

function setFollowup_22ChildrenVisibility() {
  const value = $('#followup_22').val();
  const checked = value === '1';
  setFieldVisibility('followup_22_1', checked);
  setLabelVisibility('followup_22_1_row', checked);
}

function setFollowup_23ChildrenVisibility() {
  const value = $('#followup_23').val();
  const checked = value === '1';
  setFieldVisibility('followup_23_1', checked);
  setLabelVisibility('followup_23_1_row', checked);
}

function setFollowup_26ChildrenVisibility() {
  const value = $('#followup_26').val();
  const checked = value === '1';
  const childrenFields = [
    'followup_26_1',
    'followup_26_2',
    'followup_26_3',
    'followup_26_4',
    'followup_26_5',
    'followup_26_6',
    'followup_26_7',
    'followup_26_8',
    'followup_26_9',
    'followup_26_10',
    'followup_26_11',
    'followup_26_12',
    'followup_26_13',
    'followup_26_14',
  ];
  childrenFields.forEach(function (childField) {
    setFieldVisibility(childField, checked);
    setLabelVisibility(`${childField}_row`, checked);
  });
  setFollowup_26_14ChildrenVisibility();
}

function setFollowup_26_14ChildrenVisibility() {
  const value = $('#followup_26').val();
  const value2 = $('#followup_26_14').is(':checked');
  const checked = value === '1' && value2;
  setFieldVisibility('followup_26_14_1', checked);
  setLabelVisibility('followup_26_14_1_row', checked);
}

function setFollowup_27ChildrenVisibility() {
  const value = $('#followup_27').val();
  const checked = value === '1';
  const childrenFields = [
    'followup_27_1',
    'followup_27_2',
    'followup_27_3',
    'followup_27_4',
    'followup_27_5',
    'followup_27_6',
  ];
  childrenFields.forEach(function (childField) {
    setFieldVisibility(childField, checked);
    setLabelVisibility(`${childField}_row`, checked);
  });
  setLabelVisibility('followup_27_label_1', checked);
}

function setFollowup_28ChildrenVisibility() {
  const value = $('#followup_28').val();
  const checked = value === '1';
  setFieldVisibility('followup_28_1', checked);
  setLabelVisibility('followup_28_1_row', checked);
}

function setFollowup_31ChildrenVisibility() {
  const value = $('#followup_31').val();
  const checked = value === '1';
  setFieldVisibility('followup_31_1', checked);
  setLabelVisibility('followup_31_1_row', checked);
}

function setFollowup_32ChildrenVisibility() {
  const value = $('#followup_32').val();
  const checked = value === '1';
  const childrenFields = [
    'followup_32_1',
    'followup_32_2',
    'followup_32_3',
    'followup_32_4',
    'followup_32_5',
    'followup_32_6',
    'followup_32_7',
    'followup_32_8',
    'followup_32_9',
  ];
  childrenFields.forEach(function (childField) {
    setFieldVisibility(childField, checked);
    setLabelVisibility(`${childField}_row`, checked);
  });
  setFollowup_32_8ChildrenVisibility();
}

function setFollowup_32_8ChildrenVisibility() {
  const value = $('#followup_32').val();
  const value2 = $('#followup_32_8').is(':checked');
  const checked = value === '1' && value2;
  setFieldVisibility('followup_32_8_1', checked);
  setLabelVisibility('followup_32_8_1_row', checked);
}

export default initFollowupHandlers;
