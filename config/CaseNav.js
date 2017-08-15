module.exports = [
  {
    title: '首诊',
    name: 'screening',
    link: '/screening/basic',
    children: [{
      name: 'basic',
      title: '人口学资料',
      link: '/screening/basic'
    }, {
      name: 'inclusion',
      title: '入选标准',
      link: '/screening/inclusion'
    }, {
      name: 'exclusion',
      title: '排除标准',
      link: '/screening/exclusion'
    }, {
      name: 'disease',
      title: '既往史',
      link: '/screening/disease'
    }, {
      name: 'conmed',
      title: '合并用药情况',
      link: '/screening/conmed'
    }, {
      name: 'vitalsign',
      title: '体格检查',
      link: '/screening/vitalsign'
    }, {
      name: 'lab',
      title: '实验室检查',
      link: '/screening/lab'
    }, {
      name: 'assistant',
      title: '辅助检查',
      link: '/screening/assistant'
    }, {
      name: 'method',
      title: '诊断方法',
      link: '/screening/method'
    }, {
      name: 'region',
      title: '病变位置',
      link: '/screening/region'
    }, {
      name: 'dignose',
      title: '临床，病理诊断及分期',
      link: '/screening/dignose'
    }]
  },
  {
    title: '首诊清单',
    name: 'screening-checklist',
    link: '/screening-checklist'
  },
  {
    title: '复诊',
    name: 'review-checklist',
    link: '/review-checklist'
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
    link: '/'
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
    title: '提交并锁定',
    name: 'commit',
    link: '/'
  }
];
