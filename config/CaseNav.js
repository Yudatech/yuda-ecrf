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
      en: 'Visit 1(Screening)'
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
      name: 'screening-disease',
      title: {
        zh: '既往史',
        en: 'Anamnesis'
      },
      link: '/screening-disease'
    }, {
      name: 'screening-conmed',
      title: {
        zh: '合并用药情况',
        en: 'Concomitant medication'
      },
      link: '/screening-conmed'
    }, {
      name: 'screening-vitalsign',
      title: {
        zh: '体格检查',
        en: 'Clinical status'
      },
      link: '/screening-vitalsign'
    }, {
      name: 'screening-lab',
      title: {
        zh: '实验室检查',
        en: 'Laboratorial tests'
      },
      link: '/screening-lab'
    }, {
      name: 'screening-assistant',
      title: {
        zh: '辅助检查',
        en: 'Equipment examinations'
      },
      link: '/screening-assistant'
    }, {
      name: 'screening-method',
      title: {
        zh: '诊断方法',
        en: 'Methods of diagnosis'
      },
      link: '/screening-method'
    }, {
      name: 'screening-region',
      title: {
        zh: '病变位置',
        en: 'Location of the disease'
      },
      link: '/screening-region'
    }, {
      name: 'screening-dignose',
      title: {
        zh: '临床，病理诊断及分期',
        en: 'Clinical diagnosis, pathological diagnosis and staging'
      },
      link: '/screening-dignose'
    }]
  },
  {
    title: {
      zh: '首诊清单',
      en: 'Checklist for Visit 1'
    },
    name: 'screeningchecklist',
    link: '/screeningchecklist'
  },
  {
    title: {
      zh: '复诊(入组)',
      en: 'Visit 2 (Enrollment)'
    },
    name: 'reviewchecklist',
    link: '/reviewchecklist'
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
      zh: '访视',
      en: 'Postoperative Visit'

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
      en: 'REPORT: Adverse Event (AE)/ Device Deficiency'
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
      zh: '中途退出试验',
      en: 'Withdrawal from the study'
    },
    name: 'discontinuation',
    link: '/discontinuation'
  }
];
