const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  summary: {
    title: {
      zh: '指表数据一览',
      en: 'Summary'
    },
    titles: [{
      name: 'finished',
      text: {
        zh: '已完成病例',
        en: 'Completed'
      }
    }, {
      name: 'ongoing',
      text: {
        zh: '待完成病例',
        en: 'Ongoing'
      }
    }, {
      name: 'questions',
      text: {
        zh: '待回复质疑',
        en: 'Queries'
      }
    }, {
      name: 'contribution',
      text: {
        zh: '贡献度',
        en: 'Contribution'
      }
    }, {
      name: 'discontinuationRate',
      text: {
        zh: '中途退出率',
        en: 'Discontinuation'
      }
    }]
  },
  cases: {
    title: {
      zh: '病例',
      en: 'Cases'
    },
    headers: [{
      name: '_id',
      text: {
        zh: '病人号',
        en: 'Subject ID'
      }
    }, {
      name: 'subjabbr',
      text: {
        zh: '病人姓名缩写',
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
      zh: '待回复质疑',
      en: 'Queries'
    },
    headers: [{
      name: '_id',
      text: {
        zh: '病人号',
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
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.summary = {
    titles: config.summary.titles.map((item) => {
      return {
        name: item.name,
        text: item.text[lang]
      };
    })
  };
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

  return result;
};
