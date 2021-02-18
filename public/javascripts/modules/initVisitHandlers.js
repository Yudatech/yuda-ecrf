import requireValidator from './validators/requireValidator';
import setFieldVisibility from './helpers/setFieldVisibility';
import setLabelVisibility from './helpers/setLabelVisibility';

function initVisitHandlers() {
  const postoperative_2El = $('#postoperative_2');

  postoperative_2El.change(function () {
    setPostoperative_2_1Visibility();
  });
  setPostoperative_2_1Visibility();

  $('#postoperative_2_1').change(function () {
    setPostoperative_2_1ChildrenVisibility();
  });

  $('input[type=radio][name=postoperative_2_1_18]').change(function () {
    setPostoperative_2_18ChildrenVisibility();
  });
  $('input[type=radio]').change(function () {
    setErrorElementVisibility();
  });
  setErrorElementVisibility();

  const extra = $('#assessmentdtc').data('extra');
  $('.input-group.date').datepicker('setEndDate', new Date());
  if (extra.start) {
    $('.input-group.date').datepicker('setStartDate', extra.start);
  }
  $('.input-group.date').datepicker().on('changeDate', function (e) {
    const newDateStringArray = e.format('yyyy/mm/dd').split('/');
    const newDate = new Date(newDateStringArray[0], parseInt(newDateStringArray[1], 10) - 1, newDateStringArray[2], 0, 0, 0);
    const surgeryDateStringArray = extra.start.split('/');
    const surgeryDate = new Date(surgeryDateStringArray[0], parseInt(surgeryDateStringArray[1], 10) - 1, surgeryDateStringArray[2], 0, 0, 0);
    const days = Math.floor((newDate.getTime() - surgeryDate.getTime()) / 24 / 60 / 60 / 1000);
    $('#postoperativeday').val('Postoperative day (POD) ' + days);
  })

  $('#visit-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequired: requireValidator
    }
  });
  $('#visit-form').validator('validate');
}

function setErrorElementVisibility() {
  const errorEl1 = $('#visit-error-1');
  const errorEl2 = $('#visit-error-2');
  const children = ['postoperative_2_1_2', 'postoperative_2_1_3', 'postoperative_2_1_4', 'postoperative_2_1_5', 'postoperative_2_1_6', 'postoperative_2_1_7', 'postoperative_2_1_8', 'postoperative_2_1_9', 'postoperative_2_1_10', 'postoperative_2_1_11', 'postoperative_2_1_12', 'postoperative_2_1_13', 'postoperative_2_1_14', 'postoperative_2_1_15', 'postoperative_2_1_16', 'postoperative_2_1_17', 'postoperative_2_1_18'];
  const values = children.map(function (child) {
    return parseInt($(`input[type=radio][name=${child}]:checked`).val());
  });
  const postoperative_2_value = $('#postoperative_2').val();
  const postoperative_2_1_value = $('#postoperative_2_1').val();
  const maxValue = Math.max(...values);

  if (postoperative_2_value === '0' && postoperative_2_1_value === '1' && maxValue >= 1 && maxValue <= 3) {
    errorEl1.removeClass('hidden');
    errorEl2.addClass('hidden');
  }
  else if (postoperative_2_value === '0' && postoperative_2_1_value === '1' && maxValue > 3) {
    errorEl2.removeClass('hidden');
    errorEl1.addClass('hidden');
  }
  else {
    errorEl1.addClass('hidden');
    errorEl2.addClass('hidden');
  }
}

function setPostoperative_2_1Visibility() {
  const value = $('#postoperative_2').val();
  const checked = value === '0'
  setFieldVisibility('postoperative_2_1', checked);
  setErrorElementVisibility();
  setPostoperative_2_1ChildrenVisibility();
  setPostoperative_2_18ChildrenVisibility();
}

function setPostoperative_2_18ChildrenVisibility() {
  const parentValue = $('#postoperative_2_1').val();
  const postoperative_2_value = $('#postoperative_2').val();
  const value = $('input[type=radio][name=postoperative_2_1_18]:checked').val();
  const checked = parentValue === '1' && postoperative_2_value === '0' && parseInt(value) > 0;
  setFieldVisibility('postoperative_2_1_18_1', checked);
}

function setPostoperative_2_1ChildrenVisibility() {
  const value = $('#postoperative_2_1').val();
  const postoperative_2_value = $('#postoperative_2').val();
  const checked = value === '1' && postoperative_2_value === '0';
  const labels = ['postoperative_2_1_label_1', 'postoperative_2_1_label_2', 'postoperative_2_1_label_3', 'postoperative_2_1_label_4', 'visit_doc_1', 'postoperative_2_1_div'];
  const children = ['postoperative_2_1_1', 'postoperative_2_1_2', 'postoperative_2_1_3', 'postoperative_2_1_4', 'postoperative_2_1_5', 'postoperative_2_1_6', 'postoperative_2_1_7', 'postoperative_2_1_8', 'postoperative_2_1_9', 'postoperative_2_1_10', 'postoperative_2_1_11', 'postoperative_2_1_12', 'postoperative_2_1_13', 'postoperative_2_1_14', 'postoperative_2_1_15', 'postoperative_2_1_16', 'postoperative_2_1_17', 'postoperative_2_1_18', 'postoperative_2_1_19',];
  children.forEach(function (child) {
    setFieldVisibility(child, checked);
  });
  labels.forEach(function (label) {
    setLabelVisibility(label, checked);
  })
  setPostoperative_2_18ChildrenVisibility();
  setErrorElementVisibility();
}

export default initVisitHandlers;
