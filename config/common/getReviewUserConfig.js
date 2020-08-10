const config = [{
  value: 'supervisor',
  text: {
    zh: '试验中心负责人',
    en: 'Supervisor'
  }
}, {
  value: 'monitor',
  text: {
    zh: '试验监察员',
    en: 'Monitor'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'en';
  }

  return config.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
