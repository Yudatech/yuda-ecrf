const status = [{
  value: 'open',
  text: {
    zh: '进行中',
    en: 'Open'
  }
}, {
  value: 'committed',
  text: {
    zh: '待审核',
    en: 'Committed'
  }
}, {
  value: 'audited',
  text: {
    zh: '已审核',
    en: 'Audited'
  }
}, {
  value: 'locked',
  text: {
    zh: '已完成',
    en: 'Locked'
  }
}, {
  value: 'quit',
  text: {
    zh: '中途退出',
    en: 'Quit'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  status.forEach((item) => {
    result[item.value] = {
      value: item.value,
      text: item.text[lang]
    };
  });
  return result;
};
