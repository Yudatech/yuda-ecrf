const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const numberWithIntValidate = {
  type: Number,
  validate: [validator.isInt, 'Int value required.']
};

const aeSchema = new Schema({
  caseid: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid'
  },
  /**
   * AE
   */
  // 来源
  aeorigion: String,
  // 事件 (名称及症状)
  event: String,
  // 发生时间
  aestdtc: {
    type: Date,
    default: Date.now
  },
  // 结束时间
  aeeddtc: {
    type: Date,
    default: Date.now
  },
  // 严重程度
  aeserv: numberWithIntValidate,
  // 采取措施
  aeact: Boolean,
  // 报告
  aerpt: Boolean,
  // 与试验器械和/或试验操作的关系
  aerel: numberWithIntValidate,
  // 转归
  aeres_1: numberWithIntValidate,
  // 转归后遗症
  aeres_2: Boolean,
  // SAE
  aesae: Boolean,
  // 器械缺陷
  aedevicedft: Boolean,
  // 因该事件退出试验
  aediscon: Boolean,
  // 签字
  aesignature_1: String,
  // 日期
  aesignature_2: {
    type: Date,
    default: Date.now
  }
});

aeSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Ae', aeSchema);
