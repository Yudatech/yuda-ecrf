const sex = [{
  value: 0,
  text: {
    zh: '男'
  }
}, {
  value: 1,
  text: {
    zh: '女'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return sex.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
