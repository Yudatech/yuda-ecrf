import '../sass/style.scss';
import acceptDocPreview from './modules/acceptDocPreview';

import initScreeningBasicHandlers from './modules/initScreeningBasicHandlers';

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
  console.log($(realId));
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
}
