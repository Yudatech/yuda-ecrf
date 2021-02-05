const surgeryMethods = [{
  value: 0,
  text: {
    zh: '开腹手术',
    en: 'Open surgery'
  }
}, {
  value: 1,
  text: {
    zh: '腹腔镜手术',
    en: 'Laparoscopic surgery'
  }
}, {
  value: 2,
  text: {
    zh: '机器人手术',
    en: 'Robotic surgery'
  }
}, {
  value: 3,
  text: {
    zh: '机器人手术',
    en: 'Laparoscopic/Robotic converted to open surgery'
  }
}];

module.exports = function (lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return surgeryMethods.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
