const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const saeSchema = new Schema({
  case: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid'
  },
  /**
   * SAE
   */
  // 来源
  saeorigion: String,
  saeorigion_1: String,
  // 报告类型
  saetpe: Number,
  // 报告时间
  saedtc: {
    type: Date
  },
  saecomoandtreatment: Boolean,
  saecomoandtreatment_1_diagnosis: String,
  saecomoandtreatment_1_medication: String,
  saecomoandtreatment_1_dose: String,
  saecomoandtreatment_2_diagnosis: String,
  saecomoandtreatment_2_medication: String,
  saecomoandtreatment_2_dose: String,
  saecomoandtreatment_3_diagnosis: String,
  saecomoandtreatment_3_medication: String,
  saecomoandtreatment_3_dose: String,
  // SAE的医学术语(诊断)
  saeterm: String,
  // SAE情况 - 死亡
  saecaus_1: Boolean,
  // SAE情况 死亡时间
  saecaus_2: {
    type: Date
  },
  // SAE情况 - 导致住院
  saecaus_3: Boolean,
  // SAE情况 - 延长住院时间
  saecaus_4: Boolean,
  // SAE情况 - 伤残
  saecaus_5: Boolean,
  // SAE情况 - 功能障碍
  saecaus_6: Boolean,
  // SAE情况 - 导致先天畸形
  saecaus_7: Boolean,
  // SAE情况 - 危及生命
  saecaus_8: Boolean,
  // SAE情况 - 其他
  saecaus_9: Boolean,
  // SAE情况 其它 (填写)
  saecaus_10: String,
  // SAE发生时间
  saestdtc: {
    type: Date
  },
  // 研究者获知SAE时间
  saenoticedtc: {
    type: Date
  },
  // 对受试器械采取的措施
  saeact: Number,
  // SAE转归
  saeres_1: Number,
  // SAE转归(后遗症 )
  saeres_2: Boolean,
  // SAE与受试器械的关系
  saerel: Number,
  // SAE报道情况(国内)
  saerpt_1: Number,
  // SAE报道情况(国外)
  saerpt_2: Number,
  // SAE发生及处理的详细情况
  saedesc: String
});

saeSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Sae', saeSchema);
