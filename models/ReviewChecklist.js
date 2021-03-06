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
  reviewcheckdate: {
    type: Date
  },
  // 肠道清洁
  reviewcheck_2: Boolean,
  // 粪便松软
  reviewcheck_3: Boolean,
  // 预防性抗生素 (若使用抗生素，请完整填写《合并用药情况表》)
  reviewcheck_4: Boolean,
});

reviewChecklistSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('ReviewChecklist', reviewChecklistSchema);
