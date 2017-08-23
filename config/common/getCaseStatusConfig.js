const status = [{
  value: 'open',
  text: {
    zh: '进行中'
  }
}, {
  value: 'committed',
  text: {
    zh: '待审核'
  }
}, {
  value: 'audited',
  text: {
    zh: '已审核'
  }
}, {
  value: 'locked',
  text: {
    zh: '已完成'
  }
}, {
  value: 'quit',
  text: {
    zh: '中途退出'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return status.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
