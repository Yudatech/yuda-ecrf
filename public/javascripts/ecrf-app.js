import '../sass/style.scss';
import acceptDocPreview from './modules/acceptDocPreview';

import initScreeningBasicHandlers from './modules/initScreeningBasicHandlers';
import initScreeningExclusionHandlers from './modules/initScreeningExclusionHandlers';
import initScreeningPrioradiationtherapyHandlers from './modules/initScreeningPrioradiationtherapyHandlers';
import initScreeningInclusionHandlers from './modules/initScreeningInclusionHandlers';
import initScreeningRegionHandlers from './modules/initScreeningRegionHandlers';
import initSurgeryHandlers from './modules/initSurgeryHandlers';
import initVisitHandlers from './modules/initVisitHandlers';
import initSaeHandlers from './modules/initSaeHandlers';
import initReviewChecklistHandlers from './modules/initReviewChecklistHandlers';
import initDiscontinuationHandlers from './modules/initDiscontinuationHandlers';
import initHomeHandlers from './modules/initHomeHandlers';
import initCaseFormHandlers from './modules/initCaseFormHandlers';
import initScreeningDignoseHandlers from './modules/initScreeningDignoseHandlers';
import initSearchHandlers from './modules/initSearchHandlers';
import initAeHandlers from './modules/initAeHandlers';
import initSitesHandlers from './modules/initSitesHandlers';
import initUsersHandlers from './modules/initUsersHandlers';
import initVisitTableHandlers from './modules/initVisitTableHandlers';
import initAeTableHandlers from './modules/initAeTableHandlers';
import initSaeTableHandlers from './modules/initSaeTableHandlers';
import initLifeAssessmentHandlers from './modules/initLifeAssessmentHandlers';
import initEvacuationHandlers from './modules/initEvacuationHandlers';
import initFollowupHandlers from './modules/initFollowupHandlers';
import initEvacuationFollowupHandler from './modules/initEvacuationFollowupHandler';

$('.input-group.date')
  .datepicker({
    endDate: new Date(),
  })
  .on('changeDate', function (e) {
    const targetId = e.target.id;
    const realId = `#${targetId}Real`;
    $(realId).val(e.format('yyyy/mm/dd'));
  });
$('.bootstrap-timepicker.timepicker>input')
  .timepicker({
    showMeridian: false,
    defaultTime: false,
  })
  .on('changeTime.timepicker', function (e) {
    const targetId = e.target.id;
    const realId = `#${targetId}Real`;
    $(realId).val(e.time.value);
  });
window.acceptDocPreview = acceptDocPreview;

window.handleCheckboxClick = function (el) {
  const checked = el.checked;
  const realId = '#' + el.id + 'Real';
  const value = checked === true ? 'true' : 'false';
  $(realId).val(value);
};

window.onload = function () {
  const pathname = window.location.pathname;

  // If there is a form, add dirty form plugin
  if ($('form').length > 0) {
    $('form').dirtyForms({
      dialog: {
        dialogID: 'confirm-leave-dialog',
        proceedButtonClass: 'custom-proceed',
        proceedButtonText: 'Continue without saving',
        stayButtonClass: 'custom-stay',
        stayButtonText: 'Go back and save',
      },
    });
  }

  if (pathname === '/') {
    initHomeHandlers();
  } else if (pathname === '/search') {
    initSearchHandlers();
  } else if (pathname === '/case') {
    initCaseFormHandlers();
  } else if (pathname.startsWith('/screening-basic')) {
    initScreeningBasicHandlers();
  } else if (pathname.startsWith('/screening-exclusion')) {
    initScreeningExclusionHandlers();
  } else if (pathname.startsWith('/screening-prioradiationtherapy')) {
    initScreeningPrioradiationtherapyHandlers();
  } else if (pathname.startsWith('/screening-inclusion')) {
    initScreeningInclusionHandlers();
  } else if (pathname.startsWith('/screening-dignose')) {
    initScreeningDignoseHandlers();
  } else if (pathname.startsWith('/screening-region')) {
    initScreeningRegionHandlers();
  } else if (pathname.startsWith('/surgery')) {
    initSurgeryHandlers();
  } else if (pathname.startsWith('/visit/')) {
    initVisitHandlers();
  } else if (pathname.startsWith('/visitlist/')) {
    initVisitTableHandlers();
  } else if (pathname.startsWith('/sae/')) {
    initSaeHandlers();
  } else if (pathname.startsWith('/saelist/')) {
    initSaeTableHandlers();
  } else if (pathname.startsWith('/ae/')) {
    initAeHandlers();
  } else if (pathname.startsWith('/aelist/')) {
    initAeTableHandlers();
  } else if (pathname.startsWith('/reviewchecklist/')) {
    initReviewChecklistHandlers();
  } else if (pathname.startsWith('/discontinuation/')) {
    initDiscontinuationHandlers();
  } else if (pathname.startsWith('/sites')) {
    initSitesHandlers();
  } else if (pathname.startsWith('/users')) {
    initUsersHandlers();
  } else if (pathname.startsWith('/life')) {
    initLifeAssessmentHandlers();
  } else if (pathname.startsWith('/evacuation/')) {
    initEvacuationHandlers();
  } else if (pathname.startsWith('/followup')) {
    initFollowupHandlers();
  } else if (pathname.startsWith('/evacuationfollowup')) {
    initEvacuationFollowupHandler();
  }
};
