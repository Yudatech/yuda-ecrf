const CaseNav = require('../config/CaseNav');
const getSurgeryConfig = require('../config/getSurgeryConfig');
const getSurgeryAnastomoticMethodsConfig = require('../config/getSurgeryAnastomoticMethodsConfig');
const getSurgeryDmhDmhcModelConfig = require('../config/getSurgeryDmhDmhcModelConfig');
const getSurgeryLapAidModelConfig = require('../config/getSurgeryLapAidModelConfig');
const getSurgeryMethodsConfig = require('../config/getSurgeryMethodsConfig');

exports.surgeryForm = (req, res) => {
  res.render('surgery', {
    caseNav: CaseNav,
    config: getSurgeryConfig(),
    surgeryAnastomoticMethodsConfig: getSurgeryAnastomoticMethodsConfig(),
    surgeryLapAidModelConfig: getSurgeryLapAidModelConfig(),
    surgeryDmhDmhcModelConfig: getSurgeryDmhDmhcModelConfig(),
    surgeryMethodsConfig: getSurgeryMethodsConfig()
  });
};
