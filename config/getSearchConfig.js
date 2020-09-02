const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  cases: {
    title: {
      zh: '病例',
      en: 'Cases',
      sv: 'Patientfall',
    },
    headers: [{
      name: '_id',
      text: {
        zh: '受试者识别编号',
        en: 'Subject ID',
        sv: 'Identifiering av patient'
      }
    }, /*{
      name: 'subjabbr',
      text: {
        zh: '缩写',
        en: 'Subject abbreviation'
      }
    }, */{
      name: 'createDate',
      text: {
        zh: '建档日期',
        en: 'Create Date',
        sv: 'Skapad datum'
      }
    }, {
      name: 'username',
      text: {
        zh: '建档人',
        en: 'User name',
        sv: 'Skapade av'
      }
    }, {
      name: 'status',
      text: {
        zh: '状态',
        en: 'Status',
        sv: 'Status'
      }
    }, {
      name: 'operations',
      text: {
        zh: '操作',
        en: 'Operations',
        sv: 'Operationer'
      }
    }]
  },
  questions: {
    title: {
      zh: '质疑',
      en: 'Queries',
      sv: 'Förfrågor'
    },
    headers: [{
      name: '_id',
      text: {
        zh: '受试者识别编号',
        en: 'Subject ID',
        sv: 'Identifiering av patient'
      }
    }, {
      name: 'numOfDays',
      text: {
        zh: '天数',
        en: 'Number of days',
        sv: 'Antal dagar'
      }
    }, {
      name: 'orig',
      text: {
        zh: '发起人',
        en: 'Initiator',
        sv: 'Initiativtagare'
      }
    }, {
      name: 'exec',
      text: {
        zh: '执行人',
        en: 'Assignee',
        sv: 'Tilldelad'
      }
    }, {
      name: 'status',
      text: {
        zh: '状态',
        en: 'Status',
        sv: 'Status'
      }
    }, {
      name: 'operations',
      text: {
        zh: '操作',
        en: 'Operations',
        sv: 'Operationer'
      }
    }]
  },
  removeConfirm: [{
    name: 'message',
    text: {
      zh: '确认删除',
      en: 'Confirm to remove',
      sv: 'Bekräfta vid bortaggning'
    }
  }],
  formConfigs: [{
    name: 'searchinput',
    text: {
      zh: '输入病例号进行搜索',
      en: 'Input Patient Number',
      sv: 'Patients identificeringsnummer'
    }
  }, {
    name: 'cra',
    text: {
      zh: '建档人',
      en: 'Created By',
      sv: 'Skapade av'
    }
  }, {
    name: 'site',
    text: {
      zh: '中心',
      en: 'Site',
      sv: 'Institutionen'
    }
  }, {
    name: 'status',
    text: {
      zh: '病例状态',
      en: 'Case Status',
      sv: 'Ärendestatus'
    }
  }],
  searchResult: [{
    name: 'foundcase_0',
    text: {
      zh: '搜索到 ',
      en: 'Found',
      sv: 'Hittat'
    }
  }, {
    name: 'foundcase_1',
    text: {
      zh: ' 条病例，',
      en: 'cases, ',
      sv: 'patientfall'
    }
  }, {
    name: 'foundquestion',
    text: {
      zh: ' 条对应的质疑',
      en: 'queries.',
      sv: 'förfrågor'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = {};
  result.cases = {
    title: config.cases.title[lang],
    headers: config.cases.headers.map((item) => {
      return {
        name: item.name,
        text: item.text[lang]
      };
    })
  };
  result.questions = {
    title: config.questions.title[lang],
    headers: config.questions.headers.map((item) => {
      return {
        name: item.name,
        text: item.text[lang]
      };
    })
  };
  result.removeConfirm = getOptionsLang(config.removeConfirm, lang);
  result.formConfigs = getOptionsLang(config.formConfigs, lang);
  result.searchResult = getOptionsLang(config.searchResult, lang);

  return result;
};
