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
    en: 'Laparoscopy'
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
    zh: '端到端吻合',
    en: 'End-to-end anastomosis'
  }
}, {
  value: 4,
  text: {
    zh: '端侧吻合',
    en: 'End-to-side anastomosis'
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
