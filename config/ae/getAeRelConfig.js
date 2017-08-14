const aeRels = [{
  value: 0,
  text: {
    zh: '可能有关'
  }
}, {
  value: 1,
  text: {
    zh: '有关'
  }
}, {
  value: 2,
  text: {
    zh: '可能无关'
  }
}, {
  value: 3,
  text: {
    zh: '无关'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return aeRels.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
