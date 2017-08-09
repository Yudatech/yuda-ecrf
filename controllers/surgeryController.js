const CaseNav = require('../config/CaseNav');
const getSurgeryConfig = require('../config/surgery/getSurgeryConfig');
const getSurgeryAnastomoticMethodsConfig = require('../config/surgery/getSurgeryAnastomoticMethodsConfig');
const getSurgeryDmhDmhcModelConfig = require('../config/surgery/getSurgeryDmhDmhcModelConfig');
const getSurgeryLapAidModelConfig = require('../config/surgery/getSurgeryLapAidModelConfig');
const getSurgeryMethodsConfig = require('../config/surgery/getSurgeryMethodsConfig');

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
