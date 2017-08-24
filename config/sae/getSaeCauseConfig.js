const saeCauses = [{
  value: 0,
  text: {
    zh: '死亡',
    en: 'Death'
  }
}, {
  value: 1,
  text: {
    zh: '导致住院',
    en: 'In-patient'
  }
}, {
  value: 2,
  text: {
    zh: '延长住院时间',
    en: 'Prolonged hospitalization'
  }
}, {
  value: 3,
  text: {
    zh: '伤残',
    en: 'Disability'
  }
}, {
  value: 4,
  text: {
    zh: '功能障碍',
    en: 'Disfunction'
  }
}, {
  value: 5,
  text: {
    zh: '导致先天畸形',
    en: 'Congenital abnomality'
  }
}, {
  value: 6,
  text: {
    zh: '危及生命',
    en: 'Life-threatning'
  }
}, {
  value: 7,
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
