const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const visitSchema = new Schema({
  case: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid'
  },
  /**
   * VISIT
   */
  // 第n次查房
  visit: String,
  // 第n次查房
  visitnum: Number,
  // 查房日期
  visitdtc: {
    type: Date,
    default: Date.now
  },
  // 访视方式
  visittype: Number,
  // 计划外访视原因
  visitreason: String,
  // 处理/治疗
  visittreat: String,
  // 转归
  visitres: Number,
  // 腹痛
  param_1: Number,
  // 腹部触诊
  param_2: Number,
  // 切口感染
  param_3: Number,
  // 血常规检查(必要时)
  param_4: Boolean,
  // 血红蛋白 (Hb)
  param_5: Number,
  // 白细胞 (WBC)
  param_6: Number,
  // 体温
  param_7: Number,
  // 肠鸣音(根据医生检查)
  param_8: Number,
  // 肠鸣音(根据受试者感受)
  param_9: Boolean,
  // 排气
  param_10: Boolean,
  // 排便
  param_11: Boolean,
  // 进食
  param_12: Boolean,
  // 食物类型
  param_13: Number,
  // 拔除胃管
  param_14: Boolean,
  // 拔除腹部引流
  param_15: Boolean,
  // 其他检查
  param_16: Boolean,
  // 其他检查(有，请注明检查项目及结果)
  param_17: String,
  // 止痛药物使用
  param_18: Boolean,
  // 短期植入吻合环排出
  param_19: Boolean,
  // 自然排出
  param_20: Boolean,
  // 人工取出或经外科操作取出
  param_21: Boolean,
  // 不良事件
  param_22: Boolean
});

visitSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Visit', visitSchema);
