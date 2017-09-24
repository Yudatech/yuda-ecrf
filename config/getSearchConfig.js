const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  cases: {
    title: {
      zh: '病例',
      en: 'Cases'
    },
    headers: [{
      name: '_id',
      text: {
        zh: '受试者识别编号',
        en: 'Subject ID'
      }
    }, {
      name: 'subjabbr',
      text: {
        zh: '缩写',
        en: 'Subject abbreviation'
      }
    }, {
      name: 'createDate',
      text: {
        zh: '建档日期',
        en: 'Create Date'
      }
    }, {
      name: 'username',
      text: {
        zh: '建档人',
        en: 'User name'
      }
    }, {
      name: 'status',
      text: {
        zh: '状态',
        en: 'Status'
      }
    }, {
      name: 'operations',
      text: {
        zh: '操作',
        en: 'Operations'
      }
    }]
  },
  questions: {
    title: {
      zh: '质疑',
      en: 'Queries'
    },
    headers: [{
      name: '_id',
      text: {
        zh: '受试者识别编号',
        en: 'Subject ID'
      }
    }, {
      name: 'numOfDays',
      text: {
        zh: '天数',
        en: 'Number of days'
      }
    }, {
      name: 'orig',
      text: {
        zh: '发起人',
        en: 'Initiator'
      }
    }, {
      name: 'exec',
      text: {
        zh: '执行人',
        en: 'Assignee'
      }
    }, {
      name: 'status',
      text: {
        zh: '状态',
        en: 'Status'
      }
    }, {
      name: 'operations',
      text: {
        zh: '操作',
        en: 'Operations'
      }
    }]
  },
  removeConfirm: [{
    name: 'message',
    text: {
      zh: '确认删除',
      en: 'Confirm to remove'
    }
  }],
  formConfigs: [{
    name: 'searchinput',
    text: {
      zh: '输入病例号或病人姓名缩写进行搜索',
      en: 'Input Patient Number or Name Abbreviation'
    }
  }, {
    name: 'cra',
    text: {
      zh: '建档人',
      en: 'Created By'
    }
  }, {
    name: 'site',
    text: {
      zh: '中心',
      en: 'Site'
    }
  }, {
    name: 'status',
    text: {
      zh: '病例状态',
      en: 'Case Status'
    }
  }],
  searchResult: [{
    name: 'foundcase_0',
    text: {
      zh: '搜索到 ',
      en: 'Found'
    }
  }, {
    name: 'foundcase_1',
    text: {
      zh: ' 条病例，',
      en: 'cases, '
    }
  }, {
    name: 'foundquestion',
    text: {
      zh: ' 条对应的质疑',
      en: 'queries.'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
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
