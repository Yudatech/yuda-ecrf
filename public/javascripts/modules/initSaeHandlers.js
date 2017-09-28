import setFieldVisibility from './helpers/setFieldVisibility';
import requireValidator from './validators/requireValidator';
import setErrorStyle from './helpers/setErrorStyle';

function initSaeHandlers() {
  const saecaus_9El = $('#saecaus_9');
  
  saecaus_9El.change(function(){
    setSaecaus10Visibility();
  });

  $('#saecaus_1').change(function(){
    setSaecaus2Visibility();
  });

  $('#saeres_1').change(function(){
    setSaeres2Visibility();
  });
  
  $('#saestdtc_date').datepicker().on('changeDate', function(e){
    $('#saecaus_2').datepicker('setStartDate', e.date);
    setSaecause2ErrorStyle();
  });

  $('#saecaus_2').datepicker().on('changeDate', function(e){
    setSaecause2ErrorStyle();
  });

  $('#sae-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequired: requireValidator
    }
  });
  $('#sae-form').validator('validate');
}

function setSaecaus10Visibility() {
  const checked = $('#saecaus_9').is(':checked');
  setFieldVisibility('saecaus_10', checked);
}

function setSaecaus2Visibility() {
  const checked = $('#saecaus_1').is(':checked');
  setFieldVisibility('saecaus_2', checked);
}

function setSaecause2ErrorStyle() {
  const startDate = $('#saecaus_2').datepicker('getStartDate');
  const date = $('#saecaus_2Real').val();
  let dateValue = null;
  if (date !== '') {
    const [month, day, year] = date.split('/');
    const monthReal = parseInt(month, 10) - 1;
    dateValue = new Date(year, monthReal, day, 0, 0, 0).valueOf();
  }
  const showErrorStyle = startDate !== null && dateValue !== null && (startDate.valueOf() > dateValue);
  setErrorStyle('saecaus_2', showErrorStyle);
}

function setSaeres2Visibility() {
  const saeres1 = $('#saeres_1').val();
  const checked = saeres1 === '0';
  setFieldVisibility('saeres_2', checked);
}

export default initSaeHandlers;
