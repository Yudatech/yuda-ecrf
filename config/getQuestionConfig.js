const getOptionsLang = require('./configHelpers').getOptionsLang;

const config = {
  title: {
    question: {
      zh: '质疑',
      en: 'Query'
    },
    comment: {
      zh: '评论',
      en: 'Comment'
    }
  },
  questionConfigs: [{
    name: 'question_status',
    type: 'select',
    text: {
      zh: '状态',
      en: 'Status'
    }
  }],
  commentConfigs: [{
    name: 'new_comment',
    type: 'textarea',
    text: {
      zh: '新评论',
      en: 'New comment'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = {};
  result.questionConfigs = getOptionsLang(config.questionConfigs, lang);
  result.commentConfigs = getOptionsLang(config.commentConfigs, lang);
  result.title = {
    question: config.title.question[lang],
    comment: config.title.comment[lang]
  };

  return result;
};
