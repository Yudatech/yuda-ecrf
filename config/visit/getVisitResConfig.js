/**
 * For visit param_13 食物类型
 */

const visitRes = [{
  value: 0,
  text: {
    zh: '恢复良好,无需访视'
  }
}, {
  value: 1,
  text: {
    zh: '恢复良好,预约下一次访视'
  }
}, {
  value: 2,
  text: {
    zh: '尚未恢复,预约下次访视'
  }
}, {
  value: 3,
  text: {
    zh: '尚未恢复,需要住院治疗'
  }
}];

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  return visitRes.map((item) => {
    return {
      value: item.value,
      text: item.text[lang]
    };
  });
};
