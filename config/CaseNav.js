module.exports = [
  {
    title: {
      zh: '概况',
      en: 'Overview',
      sv: 'Översikt'
    },
    name: 'overview',
    link: '/overview'
  },
  {
    title: {
      zh: '首诊(筛选)',
      en: 'Preoperative screening',
      sv: 'Preoperativ undersökning'
    },
    name: 'screening',
    link: '/screening-basic',
    children: [{
      name: 'screening-basic',
      title: {
        zh: '人口学资料',
        en: 'Demographic data',
        sv: 'Demografiska data'
      },
      link: '/screening-basic'
    }, {
      name: 'screening-inclusion',
      title: {
        zh: '入选标准',
        en: 'Inclusion criteria',
        sv: 'Kriterier för inkludering'
      },
      link: '/screening-inclusion'
    }, {
      name: 'screening-exclusion',
      title: {
        zh: '排除标准',
        en: 'Exclusion criteria',
        sv: 'Uteslutningskriterier'
      },
      link: '/screening-exclusion'
    }, {
      name: 'screening-prioradiationtherapy',
      title: {
        zh: '直肠癌术前放疗',
        en: 'Prior radiation therapy for rectal cancer',
        sv: 'Tidigare strålbehandling för rektal cancer'
      },
      link: '/screening-prioradiationtherapy'
    }, {
      name: 'screening-region',
      title: {
        zh: '病变位置',
        en: 'Location of the disease',
        sv: 'Lokalisering av sjukdomen'
      },
      link: '/screening-region'
    }, {
      name: 'screening-method',
      title: {
        zh: '诊断方法',
        en: 'Methods of diagnosis',
        sv: 'Metod för diagnos'
      },
      link: '/screening-method'
    }, {
      name: 'screening-dignose',
      title: {
        zh: '临床诊断/手术指征',
        en: 'Diagnosis/Indication for surgery',
        sv: 'Diagnos/Indication för operation'
      },
      link: '/screening-dignose'
    }]
  },
  {
    title: {
      zh: '复诊(入组)',
      en: 'Day prior to surgery',
      sv: 'Dagen före operation'
    },
    name: 'reviewchecklist',
    link: '/reviewchecklist'
  },
  {
    title: {
      zh: '手术',
      en: 'Surgery',
      sv: 'Kirugi'
    },
    name: 'surgery',
    link: '/surgery'
  },
  {
    title: {
      zh: '生活质量和医疗服务利用模式评估',
      en: 'Life quality and healthcare utilization pattern assessment',
      sv: 'Frågor om livskvalitet och utvärderingsmönster för hälso- och sjukvård'
    },
    name: 'life',
    link: '/life'
  },
  {
    title: {
      zh: '访视',
      en: 'Postoperative Visit',
      sv: 'Postoperativ bedömning'

    },
    name: 'visit',
    link: '/visitlist'
  },
  {
    title: {
      zh: '排出植入吻合环',
      en: 'Evacuation of the implant',
      sv: 'Evakuering av implantatet'

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
      en: 'Severe Adverse Event',
      sv: 'Allvarliga incidenter'
    },
    name: 'sae',
    link: '/saelist'
  },
  {
    title: {
      zh: '中途退出试验',
      en: 'Discontinue',
      sv: 'Exkludering från studien'
    },
    name: 'discontinuation',
    link: '/discontinuation'
  }
];
