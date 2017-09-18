const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const discontinuationSchema = new Schema({
  case: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid'
  },
  /**
   * DISCONTINUATION
   */
  // 退出阶段
  discontinuetype: Number,
  // 退出时间
  discontinuedt: {
    type: Date
  },
  // 进行试验相关手术前，受试者希望退出试验
  discontinuersn_1: Boolean,
  // 临床研究者认为不良事件和器械缺陷将引起受试者严重或永久性损伤
  discontinuersn_2: Boolean,
  // 临床研究者认为受试者应被排除或受试者自己认为应被排除
  discontinuersn_3: Boolean,
  // 临床研究者认为受试者应被排除或受试者自己认为应被排除,请注明原因
  discontinuersn_4: String,
  // 受试者违反知情同意书中所列条款或不能遵从临床研究者医嘱
  discontinuersn_5: Boolean,
  // 其他原因
  discontinuersn_6: Boolean,
  // 其他原因，请注明
  discontinuersn_7: String,
  // 术中发现肠管直径异常或肠管壁厚度异常，例如憩室炎，慢性的肠梗阻
  discontinuersn_8: Boolean,
  // 术中发现癌扩散
  discontinuersn_9: Boolean
});

discontinuationSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Discontinuation', discontinuationSchema);
