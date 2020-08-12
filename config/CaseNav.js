module.exports = [
  {
    title: {
      zh: '概况',
      en: 'Overview'
    },
    name: 'overview',
    link: '/overview'
  },
  {
    title: {
      zh: '首诊(筛选)',
      en: 'Screening'
    },
    name: 'screening',
    link: '/screening-basic',
    children: [{
      name: 'screening-basic',
      title: {
        zh: '人口学资料',
        en: 'Demographic data'
      },
      link: '/screening-basic'
    }, {
      name: 'screening-inclusion',
      title: {
        zh: '入选标准',
        en: 'Inclusion criteria'
      },
      link: '/screening-inclusion'
    }, {
      name: 'screening-exclusion',
      title: {
        zh: '排除标准',
        en: 'Exclusion criteria'
      },
      link: '/screening-exclusion'
    }, {
      name: 'screening-prioradiationtherapy',
      title: {
        zh: '直肠癌的先前放射疗法',
        en: 'Prior radiation therapy for rectal cancer'
      },
      link: '/screening-prioradiationtherapy'
    }, {
      name: 'screening-region',
      title: {
        zh: '病变位置',
        en: 'Location of the disease'
      },
      link: '/screening-region'
    }, {
      name: 'screening-method',
      title: {
        zh: '诊断方法',
        en: 'Methods of diagnosis'
      },
      link: '/screening-method'
    }, {
      name: 'screening-dignose',
      title: {
        zh: '临床诊断',
        en: 'Diagnosis'
      },
      link: '/screening-dignose'
    }]
  },
  {
    title: {
      zh: '复诊(入组)',
      en: 'Day prior to surgery'
    },
    name: 'reviewchecklist',
    link: '/reviewchecklist'
  },
  {
    title: {
      zh: '手术',
      en: 'Surgery'
    },
    name: 'surgery',
    link: '/surgery'
  },
  {
    title: {
      zh: '生活质量和医疗利用模式评估',
      en: 'Life quality and healthcare utilization pattern assessment'
    },
    name: 'life',
    link: '/life'
  },
  {
    title: {
      zh: '访视',
      en: 'Postoperative Visit'

    },
    name: 'visit',
    link: '/visitlist'
  },
  {
    title: {
      zh: '取出植入物',
      en: 'Evacuation of the implant'

    },
    name: 'evacuation',
    link: '/evacuation'
  },
  {
    title: {
      zh: '合并用药情况',
      en: 'Concomitant Medication'
    },
    name: 'cm',
    link: '/cmlist'
  },
  {
    title: {
      zh: '不良事件',
      en: 'Adverse Event'
    },
    name: 'ae',
    link: '/aelist'
  },
  {
    title: {
      zh: '严重不良事件',
      en: 'Severe Adverse Event'
    },
    name: 'sae',
    link: '/saelist'
  },
  {
    title: {
      zh: '中途退出试验',
      en: 'Discontinue'
    },
    name: 'discontinuation',
    link: '/discontinuation'
  }
];
