const questionStatus = [{
  value: 0,
  text: {
    zh: '开放'
  }
}, {
  value: 1,
  text: {
    zh: '待审核'
  }
}, {
  value: 1,
  text: {
    zh: '完成'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return questionStatus.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
