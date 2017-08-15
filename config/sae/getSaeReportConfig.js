const saeReports = [{
  value: 0,
  text: {
    zh: '有'
  }
}, {
  value: 1,
  text: {
    zh: '无'
  }
}, {
  value: 2,
  text: {
    zh: '不详'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return saeReports.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
