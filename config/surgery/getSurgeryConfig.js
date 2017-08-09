const getOptionsLang = require('../configHelpers').getOptionsLang;

const config = {
  title: {
    device: {
      zh: '器械'
    },
    surgery: {
      zh: '手术'
    }
  },
  options: [{
    name: 'device_1',
    text: {
      zh: 'C-REX LapAid型号'
    }
  }, {
    name: 'device_2',
    text: {
      zh: 'C-REX DMH/DMHC型号'
    }
  }, {
    name: 'surgery_1',
    text: {
      zh: '肠切除术-Descending colon'
    }
  }, {
    name: 'surgery_2',
    text: {
      zh: '肠切除术-Sigmoid colon'
    }
  }, {
    name: 'surgery_3',
    text: {
      zh: '肠切除术-Rectum'
    }
  }, {
    name: 'surgery_4',
    text: {
      zh: '肿瘤距离肛门(cm)'
    }
  }, {
    name: 'surgery_5',
    text: {
      zh: '肿瘤大小-长度(cm)'
    }
  }, {
    name: 'surgery_6',
    text: {
      zh: '肿瘤大小-宽度(cm)'
    }
  }, {
    name: 'surgery_7',
    text: {
      zh: '肿瘤浸润范围'
    }
  }, {
    name: 'surgery_8',
    text: {
      zh: '吻合方式'
    }
  }, {
    name: 'surgery_9',
    text: {
      zh: '手术方式'
    }
  }, {
    name: 'surgery_10',
    text: {
      zh: '术中吻合口完整性压力(mbar)'
    }
  }, {
    name: 'surgery_11',
    text: {
      zh: '肛门外监测导管长度-若使用DMC(cm)'
    }
  }, {
    name: 'surgery_12',
    text: {
      zh: '手术时间(分钟)'
    }
  }, {
    name: 'surgery_13',
    text: {
      zh: '术中出血量(mL)'
    }
  }, {
    name: 'surgery_14',
    text: {
      zh: '不良事件(若发生不良事件，请完整填写《不良事件及器械缺陷报告表》)'
    }
  }, {
    name: 'surgery_15',
    text: {
      zh: '术中发现肠管直径异常或肠管壁厚度异常，例如憩室炎，慢性的肠梗阻'
    }
  }, {
    name: 'surgery_16',
    text: {
      zh: '术中发现癌扩散'
    }
  }, {
    name: 'surgery_17',
    text: {
      zh: '其他'
    }
  }, {
    name: 'surgery_18',
    text: {
      zh: '其他，请注明原因'
    }
  }]
};

module.exports = function(lang) {
  if (lang === undefined) {
    lang = 'zh';
  }

  const result = getOptionsLang(config.options);
  result.title = {
    device: config.title.device[lang],
    surgery: config.title.surgery[lang]
  };

  return result;
};
