const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const reviewChecklistSchema = new Schema({
  caseid: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid'
  },
  /**
   * REVIEW_CHECKLIST
   */
  // 受试者住院
  reviewcheck_1: Boolean,
  // 肠道清洁
  reviewcheck_2: Boolean,
  // 预防性抗生素
  reviewcheck_3: Boolean,
  // 预防性抗凝血药
  reviewcheck_4: Boolean,
  // 签字
  reviewchecksignature_1: String,
  // 日期
  reviewchecksignature_2: {
    type: Date,
    default: Date.now
  }
});

reviewChecklistSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('ReviewChecklist', reviewChecklistSchema);
