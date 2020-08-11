const config = {
  titles: [
    {
      name: 'screening',
      text: {
        zh: '首诊(筛选)',
        en: 'Screening'
      }
    },
    {
      name: 'reviewchecklist',
      text: {
        zh: '复诊(入组)',
        en: 'Enrollment'
      }
    },
    {
      name: 'discontinuation',
      text: {
        zh: '中途退出试验',
        en: 'Discontinue'
      }
    },
    {
      name: 'cm',
      text: {
        zh: '合并用药情况',
        en: 'Concomitant Medication'
      }
    },
    {
      name: 'sae',
      text: {
        zh: '严重不良事件',
        en: 'Severe Adverse Event'
      }
    },
    {
      name: 'ae',
      text: {
        zh: '不良事件',
        en: 'Adverse Event'
      }
    },
    {
      name: 'surgery',
      text: {
        zh: '手术',
        en: 'Surgery'
      }
    },
    {
      name: 'visit',
      text: {
        zh: '访视',
        en: 'Postoperative Visit'
      }
    }
  ],
  common: [{
    name: 'caseId',
    text: {
      zh: '病人号',
      en: 'Subject Identification No.'
    }
  }, {
    name: 'subjname',
    text: {
      zh: '病人名称',
      en: 'Subject Name'
    }
  }, {
    name: 'status',
    text: {
      zh: '病例状态',
      en: 'Case status'
    }
  }, {
    name: 'createDate',
    text: {
      zh: '病例建档日期',
      en: 'Case create date'
    }
  }, {
    name: 'siteName',
    text: {
      zh: 'SITE名称',
      en: 'Site Name'
    }
  }, {
    name: 'craName',
    text: {
      zh: '负责CRA',
      en: 'CRA Name'
    }
  }, {
    name: 'monitorName',
    text: {
      zh: '负责MONITOR',
      en: 'Monitor Name'
    }
  }, {
    name: 'supervisorName',
    text: {
      zh: '负责SUPERVISOR',
      en: 'Supervisor Name'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  const result = {};
  result.common = config.common.map((item) => {
    return {
      name: item.name,
      text: item.text[lang]
    };
  });
  result.titles = config.titles.map((item) => {
    return {
      name: item.name,
      text: item.text[lang]
    };
  });

  return result;
};
