import '../sass/style.scss';
import acceptDocPreview from './modules/acceptDocPreview';

import initScreeningBasicHandlers from './modules/initScreeningBasicHandlers';
import initScreeningExclusionHandlers from './modules/initScreeningExclusionHandlers';
import initScreeningDiseaseHandlers from './modules/initScreeningDiseaseHandlers';
import initScreeningRegionHandlers from './modules/initScreeningRegionHandlers';
import initSurgeryHandlers from './modules/initSurgeryHandlers';
import initVisitHandlers from './modules/initVisitHandlers';
import initSaeHandlers from './modules/initSaeHandlers';

$('.input-group.date').datepicker({}).on('changeDate', function(e){
  const targetId = e.target.id;
  const realId = `#${targetId}Real`;
  $(realId).val(e.format('mm/dd/yyyy'))
});
$('.bootstrap-timepicker.timepicker>input').timepicker({
  showMeridian: false,
  defaultTime: false
}).on('changeTime.timepicker', function(e){
  const targetId = e.target.id;
  const realId = `#${targetId}Real`;
  $(realId).val(e.time.value);
});
window.acceptDocPreview = acceptDocPreview;

window.handleCheckboxClick = function(el) {
  const checked = el.checked;
  const realId = '#' + el.id + 'Real';
  const value = checked === true ? 'true' : 'false';
  $(realId).val(value);
}

window.onbeforeunload = function(event) {
  console.log(event);
}

window.onload = function() {
  const pathname = window.location.pathname;
  console.log(pathname);
  if (pathname.startsWith('/screening-basic')) {
    initScreeningBasicHandlers();
  }
  else if (pathname.startsWith('/screening-exclusion')) {
    initScreeningExclusionHandlers();
  }
  else if (pathname.startsWith('/screening-disease')) {
    initScreeningDiseaseHandlers();
  }
  else if (pathname.startsWith('/screening-region')) {
    initScreeningRegionHandlers();
  }
  else if (pathname.startsWith('/surgery')) {
    initSurgeryHandlers();
  }
  else if (pathname.startsWith('/visit/')) {
    initVisitHandlers();
  }
  else if (pathname.startsWith('/sae/')) {
    initSaeHandlers();
  }
}
