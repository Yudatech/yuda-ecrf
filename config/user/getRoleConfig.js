const role = [{
  value: 'cra',
  text: {
    zh: 'CRA',
    en: 'CRA'
  }
}, {
  value: 'supervisor',
  text: {
    zh: 'Supervisor',
    en: 'Supervisor'
  }
}, {
  value: 'monitor',
  text: {
    zh: 'Monitor',
    en: 'Monitor'
  }
}, {
  value: 'admin',
  text: {
    zh: 'Admin',
    en: 'Admin'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return role.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
