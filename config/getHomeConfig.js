const config = {
  summary: {
    title: {
      zh: '指表数据一览'
    },
    titles: [{
      name: 'comitted',
      text: {
        zh: '已提交病例'
      }
    }, {
      name: 'ongoing',
      text: {
        zh: '待完成病例'
      }
    }, {
      name: 'questions',
      text: {
        zh: '待回复质疑'
      }
    }, {
      name: 'contribution',
      text: {
        zh: '贡献度'
      }
    }, {
      name: 'discontinuationRate',
      text: {
        zh: '中途退出率'
      }
    }]
  },
  cases: {
    title: {
      zh: '病例'
    },
    headers: [{
      name: '_id',
      text: {
        zh: '病人号'
      }
    }, {
      name: 'subjabbr',
      text: {
        zh: '病人姓名缩写'
      }
    }, {
      name: 'createDate',
      text: {
        zh: '建档日期'
      }
    }, {
      name: 'username',
      text: {
        zh: '建档人'
      }
    }, {
      name: 'status',
      text: {
        zh: '状态'
      }
    }, {
      name: 'operations',
      text: {
        zh: '操作'
      }
    }]
  },
  questions: {
    title: {
      zh: '待回复质疑'
    },
    headers: [{
      name: '_id',
      text: {
        zh: '病人号'
      }
    }, {
      name: 'numOfDays',
      text: {
        zh: '天数'
      }
    }, {
      name: 'orig',
      text: {
        zh: '发起人'
      }
    }, {
      name: 'operations',
      text: {
        zh: '操作'
      }
    }]
  }
};

module.exports = function (lang) {
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

  return result;
};
