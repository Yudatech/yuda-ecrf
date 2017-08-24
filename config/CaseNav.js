module.exports = [
  {
    title: {
      zh: '概况'
    },
    name: 'overview',
    link: '/overview'
  },
  {
    title: {
      zh: '首诊(筛选)'
    },
    name: 'screening',
    link: '/screening-basic',
    children: [{
      name: 'screening-basic',
      title: {
        zh: '人口学资料'
      },
      link: '/screening-basic'
    }, {
      name: 'screening-inclusion',
      title: {
        zh: '入选标准'
      },
      link: '/screening-inclusion'
    }, {
      name: 'screening-exclusion',
      title: {
        zh: '排除标准'
      },
      link: '/screening-exclusion'
    }, {
      name: 'screening-disease',
      title: {
        zh: '既往史'
      },
      link: '/screening-disease'
    }, {
      name: 'screening-conmed',
      title: {
        zh: '合并用药情况'
      },
      link: '/screening-conmed'
    }, {
      name: 'screening-vitalsign',
      title: {
        zh: '体格检查'
      },
      link: '/screening-vitalsign'
    }, {
      name: 'screening-lab',
      title: {
        zh: '实验室检查'
      },
      link: '/screening-lab'
    }, {
      name: 'screening-assistant',
      title: {
        zh: '辅助检查'
      },
      link: '/screening-assistant'
    }, {
      name: 'screening-method',
      title: {
        zh: '诊断方法'
      },
      link: '/screening-method'
    }, {
      name: 'screening-region',
      title: {
        zh: '病变位置'
      },
      link: '/screening-region'
    }, {
      name: 'screening-dignose',
      title: {
        zh: '临床，病理诊断及分期'
      },
      link: '/screening-dignose'
    }]
  },
  {
    title: {
      zh: '首诊清单'
    },
    name: 'screeningchecklist',
    link: '/screeningchecklist'
  },
  {
    title: {
      zh: '复诊(入组)'
    },
    name: 'reviewchecklist',
    link: '/reviewchecklist'
  },
  {
    title: {
      zh: '中途退出试验'
    },
    name: 'discontinuation',
    link: '/discontinuation'
  },
  {
    title: {
      zh: '手术',
      en: 'Operation'
    },
    name: 'surgery',
    link: '/surgery'
  },
  {
    title: {
      zh: '访视'
    },
    name: 'visit',
    link: '/visitlist'
  },
  {
    title: {
      zh: '合并用药情况',
      en: 'Concomitant Medication Report'
    },
    name: 'cm',
    link: '/cmlist'
  },
  {
    title: {
      zh: '不良事件',
      en: 'Adverse Event (AE)'
    },
    name: 'ae',
    link: '/aelist'
  },
  {
    title: {
      zh: '严重不良事件',
      en: 'Severe Adverse Event (SAE)'
    },
    name: 'sae',
    link: '/saelist'
  },
  {
    title: {
      zh: '提交'
    },
    name: 'commit',
    link: '/commit'
  }
];
