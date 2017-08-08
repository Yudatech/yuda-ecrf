const role = [{
  value: 'cra',
  text: {
    zh: 'CRA'
  }
}, {
  value: 'supervisor',
  text: {
    zh: 'Supervisor'
  }
}, {
  value: 'monitor',
  text: {
    zh: 'Monitor'
  }
}, {
  value: 'admin',
  text: {
    zh: 'Admin'
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
