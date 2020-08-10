const role = [{
  value: 'cra',
  text: {
    zh: 'Investigator',
    en: 'Investigator'
  }
}, {
  value: 'supervisor',
  text: {
    zh: 'Principal Investigator',
    en: 'Principal Investigator'
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
    lang = 'en';
  }

  return role.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
