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
      name: 'life',
      text: {
        zh: '生活质量和医疗利用模式评估',
        en: 'Life quality and healthcare utilization pattern assessment'
      }
    },
    {
      name: 'visit',
      text: {
        zh: '访视',
        en: 'Postoperative Visit'
      }
    },
    {
      name: 'evacuation',
      text: {
        zh: '取出植入物',
        en: 'Evacuation of the implant'
      }
    },
    {
      name: 'followup',
      text: {
        zh: '30-days Follow-up',
        en: '30-days Follow-up'
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

module.exports = function (lang) {
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
