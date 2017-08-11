import '../sass/style.scss';
import acceptDocPreview from './modules/acceptDocPreview';

$('.input-group.date').datepicker({}).on('changeDate', function(e){
  const targetId = e.target.id;
  const realId = `#${targetId}Real`;
  $(realId).val(e.format('mm/dd/yyyy'))
});
window.acceptDocPreview = acceptDocPreview;
