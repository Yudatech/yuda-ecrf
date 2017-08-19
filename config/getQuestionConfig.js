const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    question: {
      zh: '质疑'
    },
    comment: {
      zh: '评论'
    }
  },
  questionConfigs: [{
    name: 'question_status',
    type: 'select',
    text: {
      zh: '状态'
    }
  }],
  commentConfigs: [{
    name: 'new_comment',
    type: 'textarea',
    text: {
      zh: '新评论'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.questionConfigs = getOptionsLang(config.questionConfigs);
  result.commentConfigs = getOptionsLang(config.commentConfigs);
  result.title = {
    question: config.title.question[lang],
    comment: config.title.comment[lang]
  };

  return result;
};
