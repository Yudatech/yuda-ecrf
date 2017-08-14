const doseMethods = [{
  value: 0,
  text: {
    zh: '口服'
  }
}, {
  value: 1,
  text: {
    zh: '肌注'
  }
}, {
  value: 2,
  text: {
    zh: '静注'
  }
}, {
  value: 3,
  text: {
    zh: '静滴'
  }
}, {
  value: 4,
  text: {
    zh: '其他'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return doseMethods.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
