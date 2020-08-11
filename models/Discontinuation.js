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
  discontinuebeforesurgery: Boolean,
  // 退出时间
  discontinuedt: {
    type: Date
  },
  discontinuersn_1: Boolean,
  discontinuersn_2: Boolean,
  discontinuersn_2_1: Boolean,
  discontinuersn_2_2: Boolean,
  discontinuersn_2_3: Boolean,
  discontinuersn_2_4: Boolean,
  discontinuersn_2_5: String,
  discontinuersn_3: Boolean,
  discontinuersn_3_1: String,
  discontinuersn_4: Boolean,
  discontinuersn_4_1: String,
  discontinuersn_5: Boolean,
  discontinuersn_5_1: String,
  discontinuersn_6: Boolean,
  discontinuersn_6_1: String
});

discontinuationSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Discontinuation', discontinuationSchema);
