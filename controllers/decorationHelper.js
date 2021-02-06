const getSexConfig = require('../config/common/getSexConfig');
const getAbdominalExamResultConfig = require('../config/common/getAbdominalExamResultConfig');
const getLabResultEvaluationConfig = require('../config/common/getLabResultEvaluationConfig');
const getAssistantExamResultConfig = require('../config/common/getAssistantExamResultConfig');
const getClinicalStageConfig = require('../config/common/getClinicalStageConfig');
const getAeLevelConfig = require('../config/ae/getAeLevelConfig');
const getAeRelConfig = require('../config/ae/getAeRelConfig');
const getAeResConfig = require('../config/ae/getAeResConfig');
const getSaeActConfig = require('../config/sae/getSaeActConfig');
const getSaeReportConfig = require('../config/sae/getSaeReportConfig');
const getSaeRelConfig = require('../config/sae/getSaeRelConfig');
const getSaeResConfig = require('../config/sae/getSaeResConfig');
const getSaeTypesConfig = require('../config/sae/getSaeTypesConfig');
const getSaeCauseConfig = require('../config/sae/getSaeCauseConfig');
const getSurgeryAnastomoticMethodsConfig = require('../config/surgery/getSurgeryAnastomoticMethodsConfig');
const getSurgeryDeviceSizeConfig = require('../config/surgery/getSurgeryDeviceSizeConfig');
const getSurgeryDeviceTypeConfig = require('../config/surgery/getSurgeryDeviceTypeConfig');
const getAirLeakTestConfig = require('../config/surgery/getAirLeakTestConfig');
const getSurgeryMethodsConfig = require('../config/surgery/getSurgeryMethodsConfig');
const getTypeOfAnastomosisConfig = require('../config/surgery/getTypeOfAnastomosisConfig');
const getSurgeryStomaConfig = require('../config/surgery/getSurgeryStomaConfig');
const getLARSScoreConfig = require('../config/life/getLARSScoreConfig');
const getWasStomaFormedConfig = require('../config/life/getWasStomaFormedConfig');
const getCDClassificationConfig = require('../config/visit/getCDClassificationConfig');
const getPostoperativeComplicationRequiringTreatmentConfig = require('../config/visit/getPostoperativeComplicationRequiringTreatmentConfig');
const getHasPostoperativeComplicationsConfig = require('../config/visit/getHasPostoperativeComplicationsConfig');
const getEvacuationTypesConfig = require('../config/evacuation/getEvacuationTypesConfig');
const getDiscontinuationTypeConfig = require('../config/getDiscontinuationTypeConfig');
const getPriorRadiationTherapyConfig = require('../config/screening/getPriorRadiationTherapyConfig');
const getPreoperativeDiagnosisConfig = require('../config/screening/getPreoperativeDiagnosisConfig');
const getASAClassificationConfig = require('../config/screening/getASAClassificationConfig');

module.exports = {
  'getSexConfig': getSexConfig,
  'getAbdominalExamResultConfig': getAbdominalExamResultConfig,
  'getLabResultEvaluationConfig': getLabResultEvaluationConfig,
  'getAssistantExamResultConfig': getAssistantExamResultConfig,
  'getClinicalStageConfig': getClinicalStageConfig,
  'getAeLevelConfig': getAeLevelConfig,
  'getAeRelConfig': getAeRelConfig,
  'getAeResConfig': getAeResConfig,
  'getSaeActConfig': getSaeActConfig,
  'getSaeReportConfig': getSaeReportConfig,
  'getSaeRelConfig': getSaeRelConfig,
  'getSaeResConfig': getSaeResConfig,
  'getSaeTypesConfig': getSaeTypesConfig,
  'getSaeCauseConfig': getSaeCauseConfig,
  'getSurgeryAnastomoticMethodsConfig': getSurgeryAnastomoticMethodsConfig,
  'getSurgeryDeviceSizeConfig': getSurgeryDeviceSizeConfig,
  'getSurgeryDeviceTypeConfig': getSurgeryDeviceTypeConfig,
  'getLARSScoreConfig': getLARSScoreConfig,
  'getWasStomaFormedConfig': getWasStomaFormedConfig,
  'getAirLeakTestConfig': getAirLeakTestConfig,
  'getSurgeryMethodsConfig': getSurgeryMethodsConfig,
  'getTypeOfAnastomosisConfig': getTypeOfAnastomosisConfig,
  'getCDClassificationConfig': getCDClassificationConfig,
  'getEvacuationTypesConfig': getEvacuationTypesConfig,
  'getDiscontinuationTypeConfig': getDiscontinuationTypeConfig,
  'getPriorRadiationTherapyConfig': getPriorRadiationTherapyConfig,
  'getHasPostoperativeComplicationsConfig': getHasPostoperativeComplicationsConfig,
  'getPreoperativeDiagnosisConfig': getPreoperativeDiagnosisConfig,
  'getASAClassificationConfig': getASAClassificationConfig,
  'getSurgeryStomaConfig': getSurgeryStomaConfig,
  'getPostoperativeComplicationRequiringTreatmentConfig': getPostoperativeComplicationRequiringTreatmentConfig,
};
