const saeActs = [{
  value: 0,
  text: {
    zh: '保留器械'
  }
}, {
  value: 1,
  text: {
    zh: '取下/停用器械'
  }
}, {
  value: 2,
  text: {
    zh: '暂停后继续使用器械'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return saeActs.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
