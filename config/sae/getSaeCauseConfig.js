const saeCauses = [{
  value: 0,
  text: {
    zh: '死亡'
  }
}, {
  value: 1,
  text: {
    zh: '导致住院'
  }
}, {
  value: 2,
  text: {
    zh: '延长住院时间'
  }
}, {
  value: 3,
  text: {
    zh: '伤残'
  }
}, {
  value: 4,
  text: {
    zh: '功能障碍'
  }
}, {
  value: 5,
  text: {
    zh: '导致先天畸形'
  }
}, {
  value: 6,
  text: {
    zh: '危机生命'
  }
}, {
  value: 7,
  text: {
    zh: '其他'
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
