import '../sass/style.scss';
import acceptDocPreview from './modules/acceptDocPreview';

import initScreeningBasicHandlers from './modules/initScreeningBasicHandlers';
import initScreeningExclusionHandlers from './modules/initScreeningExclusionHandlers';
import initScreeningInclusionHandlers from './modules/initScreeningInclusionHandlers';
import initScreeningDiseaseHandlers from './modules/initScreeningDiseaseHandlers';
import initScreeningRegionHandlers from './modules/initScreeningRegionHandlers';
import initScreeningAssistantHandlers from './modules/initScreeningAssistantHandlers';
import initSurgeryHandlers from './modules/initSurgeryHandlers';
import initVisitHandlers from './modules/initVisitHandlers';
import initSaeHandlers from './modules/initSaeHandlers';
import initScreeningChecklistHandlers from './modules/initScreeningChecklistHandlers';
import initScreeningConmedHandlers from './modules/initScreeningConmedHandlers';
import initScreeningVitalsignHandlers from './modules/initScreeningVitalsignHandlers';
import initReviewChecklistHandlers from './modules/initReviewChecklistHandlers';
import initCMHandlers from './modules/initCMHandlers';
import initDiscontinuationHandlers from './modules/initDiscontinuationHandlers';
import initScreeningLabHandlers from './modules/initScreeningLabHandlers';
import initHomeHandlers from './modules/initHomeHandlers';
import initCaseFormHandlers from './modules/initCaseFormHandlers';
import initScreeningDignoseHandlers from './modules/initScreeningDignoseHandlers';
import initSearchHandlers from './modules/initSearchHandlers';
import initAeHandlers from './modules/initAeHandlers';
import initSitesHandlers from './modules/initSitesHandlers';
import initUsersHandlers from './modules/initUsersHandlers';
import initVisitTableHandlers from './modules/initVisitTableHandlers';
import initCMTableHandlers from './modules/initCMTableHandlers';

$('.input-group.date').datepicker({
  endDate: new Date()
}).on('changeDate', function(e){
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

  // If there is a form, add dirty form plugin
  if ($('form').length > 0) {
    $('form').dirtyForms({
      dialog: {
        dialogID: 'confirm-leave-dialog', 
        proceedButtonClass: 'custom-proceed', 
        stayButtonClass: 'custom-stay' 
      }
    });
  }

  if (pathname === '/') {
    initHomeHandlers();
  }
  else if (pathname === '/search') {
    initSearchHandlers();
  }
  else if (pathname === '/case') {
    initCaseFormHandlers();
  }
  else if (pathname.startsWith('/screening-basic')) {
    initScreeningBasicHandlers();
  }
  else if (pathname.startsWith('/screening-exclusion')) {
    initScreeningExclusionHandlers();
  }
  else if (pathname.startsWith('/screening-inclusion')) {
    initScreeningInclusionHandlers();
  }
  else if (pathname.startsWith('/screening-disease')) {
    initScreeningDiseaseHandlers();
  }
  else if (pathname.startsWith('/screening-dignose')) {
    initScreeningDignoseHandlers();
  }
  else if (pathname.startsWith('/screening-region')) {
    initScreeningRegionHandlers();
  }
  else if (pathname.startsWith('/screening-assistant')) {
    initScreeningAssistantHandlers();
  }
  else if (pathname.startsWith('/surgery')) {
    initSurgeryHandlers();
  }
  else if (pathname.startsWith('/visit/')) {
    initVisitHandlers();
  }
  else if (pathname.startsWith('/visitlist/')) {
    initVisitTableHandlers();
  }
  else if (pathname.startsWith('/sae/')) {
    initSaeHandlers();
  }
  else if (pathname.startsWith('/ae/')) {
    initAeHandlers();
  }
  else if (pathname.startsWith('/screeningchecklist')) {
    initScreeningChecklistHandlers();
  }
  else if (pathname.startsWith('/screening-conmed')) {
    initScreeningConmedHandlers();
  }
  else if (pathname.startsWith('/screening-vitalsign')) {
    initScreeningVitalsignHandlers();
  }
  else if (pathname.startsWith('/reviewchecklist/')) {
    initReviewChecklistHandlers();
  }
  else if (pathname.startsWith('/cm/')) {
    initCMHandlers();
  }
  else if (pathname.startsWith('/cmlist/')) {
    initCMTableHandlers();
  }
  else if (pathname.startsWith('/discontinuation/')) {
    initDiscontinuationHandlers();
  }
  else if (pathname.startsWith('/screening-lab')) {
    initScreeningLabHandlers();
  }
  else if (pathname.startsWith('/sites')) {
    initSitesHandlers();
  }
  else if (pathname.startsWith('/users')) {
    initUsersHandlers();
  }
}
