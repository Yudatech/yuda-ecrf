/**
 * For visit param_13 食物类型
 */

const visitRes = [{
  value: 0,
  text: {
    zh: '恢复良好,无需访视',
    en: 'Patient recovered well, no extra visit needed.'
  }
}, {
  value: 1,
  text: {
    zh: '恢复良好,预约下一次访视',
    en: 'Patient recovered well, book time for next extra vist.'
  }
}, {
  value: 2,
  text: {
    zh: '尚未恢复,预约下次访视',
    en: 'Patient has not recovered, book time for next extra visit.'
  }
}, {
  value: 3,
  text: {
    zh: '尚未恢复,需要住院治疗',
    en: 'Patient has not recovered, hospitalization needed.'
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
