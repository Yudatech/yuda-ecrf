const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const aeSchema = new Schema({
  case: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid'
  },
  /**
   * AE
   */
  // 来源
  aeorigion: String,
  aeorigion_1: String,
  // 事件 (名称及症状)
  event: String,
  // 发生时间
  aestdtc: {
    type: Date
  },
  // 结束时间
  aeeddtc: {
    type: Date
  },
  // 严重程度
  aeserv: Number,
  // 采取措施
  aeact: Boolean,
  // 与试验器械和/或试验操作的关系
  aerel: Number,
  // 转归
  aeres_1: Number,
  // 转归后遗症
  aeres_2: Boolean,
  // SAE
  aesae: Boolean,
  // 器械缺陷
  aedevicedft: Boolean,
  // 因该事件退出试验
  aediscon: Boolean
});

aeSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Ae', aeSchema);
