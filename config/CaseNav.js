module.exports = [
  {
    title: '概况',
    name: 'overview',
    link: '/overview'
  },
  {
    title: '首诊(筛选)',
    name: 'screening',
    link: '/screening-basic',
    children: [{
      name: 'screening-basic',
      title: '人口学资料',
      link: '/screening-basic'
    }, {
      name: 'screening-inclusion',
      title: '入选标准',
      link: '/screening-inclusion'
    }, {
      name: 'screening-exclusion',
      title: '排除标准',
      link: '/screening-exclusion'
    }, {
      name: 'screening-disease',
      title: '既往史',
      link: '/screening-disease'
    }, {
      name: 'screening-conmed',
      title: '合并用药情况',
      link: '/screening-conmed'
    }, {
      name: 'screening-vitalsign',
      title: '体格检查',
      link: '/screening-vitalsign'
    }, {
      name: 'screening-lab',
      title: '实验室检查',
      link: '/screening-lab'
    }, {
      name: 'screening-assistant',
      title: '辅助检查',
      link: '/screening-assistant'
    }, {
      name: 'screening-method',
      title: '诊断方法',
      link: '/screening-method'
    }, {
      name: 'screening-region',
      title: '病变位置',
      link: '/screening-region'
    }, {
      name: 'screening-dignose',
      title: '临床，病理诊断及分期',
      link: '/screening-dignose'
    }]
  },
  {
    title: '首诊清单',
    name: 'screeningchecklist',
    link: '/screeningchecklist'
  },
  {
    title: '复诊(入组)',
    name: 'reviewchecklist',
    link: '/reviewchecklist'
  },
  {
    title: '中途退出试验',
    name: 'discontinuation',
    link: '/discontinuation'
  },
  {
    title: '手术',
    name: 'surgery',
    link: '/surgery'
  },
  {
    title: '访视',
    name: 'visit',
    link: '/visitlist'
  },
  {
    title: '合并用药情况',
    name: 'cm',
    link: '/cmlist'
  },
  {
    title: '不良事件',
    name: 'ae',
    link: '/aelist'
  },
  {
    title: '严重不良事件',
    name: 'sae',
    link: '/saelist'
  },
  {
    title: '提交',
    name: 'commit',
    link: '/commit'
  }
];
