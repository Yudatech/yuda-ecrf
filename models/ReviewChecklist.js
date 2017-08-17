const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const reviewChecklistSchema = new Schema({
  case: {
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
  // 预防性抗生素 (若使用抗生素，请完整填写《合并用药情况表》)
  reviewcheck_3: Boolean,
  // 预防性抗凝血药 (若使用抗凝血药，请完整填写《合并用药情况表》)
  reviewcheck_4: Boolean
});

reviewChecklistSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('ReviewChecklist', reviewChecklistSchema);
