const saeActs = [{
  value: 0,
  text: {
    zh: '保留器械',
    en: 'Continued using the investigational device'
  }
}, {
  value: 1,
  text: {
    zh: '取下/停用器械',
    en: 'Removed/stopped using the investigational device'
  }
}, {
  value: 2,
  text: {
    zh: '暂停后继续使用器械',
    en: 'Temporarily removed the investigational device and continued using the device later'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return saeActs.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
