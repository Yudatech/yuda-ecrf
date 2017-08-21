const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const cmSchema = new Schema({
  case: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid'
  },
  /**
   * CM
   */
  // 药物名称 (通用名)
  drug: String,
  // 剂量
  dosing: String,
  // 给药途径
  dosemtd_1: Number,
  // 给药途径 其他，请注明
  dosemtd_2: String,
  // 开始日期
  cmstdtc: {
    type: Date,
    default: Date.now
  },
  // 结束日期
  cmeddtc: {
    type: Date,
    default: Date.now
  },
  // 用药原因/目的
  cmrsn: String
});

cmSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Cm', cmSchema);
