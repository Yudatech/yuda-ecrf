const surgeryMethods = [{
  value: 0,
  text: {
    zh: '开腹手术'
  }
}, {
  value: 1,
  text: {
    zh: '腹腔镜手术'
  }
}, {
  value: 2,
  text: {
    zh: '机器人手术'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return surgeryMethods.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
