const saeCauses = [{
  value: 'saecaus_1',
  text: {
    zh: '死亡',
    en: 'Death'
  }
}, {
  value: 'saecaus_3',
  text: {
    zh: '导致住院',
    en: 'In-patient'
  }
}, {
  value: 'saecaus_4',
  text: {
    zh: '延长住院时间',
    en: 'Prolonged hospitalization'
  }
}, {
  value: 'saecaus_5',
  text: {
    zh: '伤残',
    en: 'Disability'
  }
}, {
  value: 'saecaus_6',
  text: {
    zh: '功能障碍',
    en: 'Disfunction'
  }
}, {
  value: 'saecaus_7',
  text: {
    zh: '导致先天畸形',
    en: 'Congenital abnomality'
  }
}, {
  value: 'saecaus_8',
  text: {
    zh: '危及生命',
    en: 'Life-threatning'
  }
}, {
  value: 'saecaus_9',
  text: {
    zh: '其他',
    en: 'Others'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return saeCauses.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
