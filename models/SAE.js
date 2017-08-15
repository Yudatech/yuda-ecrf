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
  // 报告类型
  saetpe: Number,
  // 报告时间
  saedtc: {
    type: Date,
    default: Date.now
  },
  // 医疗机构及专业名称
  siteid: {
    type: mongoose.Schema.ObjectId,
    ref: 'Site'
  },
  // 受试器械名称
  saedevice: String,
  // 医疗器械分类
  saecat_1: String,
  // 临床研究分类
  saecat_2: String,
  // 临床试验适应症
  saediag: String,
  // 合并疾病及治疗
  saecmdisease: Boolean,
  // SAE的医学术语(诊断)
  saeterm: String,
  // SAE是否预期
  saeanti: Boolean,
  // SAE情况
  saecaus_1: Number,
  // SAE情况 死亡时间
  saecaus_2: {
    type: Date,
    default: Date.now
  },
  // SAE情况 导致住院
  saecaus_3: Boolean,
  // SAE情况 延长住院时间  
  saecaus_4: Boolean,
  // SAE情况 伤残
  saecaus_5: Boolean,
  // SAE情况  功能障碍
  saecaus_6: Boolean,
  // SAE情况  导致先天畸形
  saecaus_7: Boolean,
  // SAE情况 危及生命 
  saecaus_8: Boolean,
  // SAE情况 其它 
  saecaus_9: Boolean,
  // SAE情况 其它 (填写)
  saecaus_10: String,
  // SAE发生时间
  saestdtc: {
    type: Date,
    default: Date.now
  },
  // 研究者获知SAE时间
  saenoticedtc: {
    type: Date,
    default: Date.now
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
