const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const screeningChecklistSchema = new Schema({
  case: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid'
  },
  /**
   * SCREENING_CHECKLIST
   */
  screeningcheckdate: {
    type: Date,
    default: Date.now
  },
  // 根据标准入选/排除，在病例报告表中登记
  screeningcheck_1: Boolean,
  // 向患者口头告知本试验研究信息，演示C-REX LapAid和C-REX DMH/DMHC
  screeningcheck_2: Boolean,
  // 向患者提供本试验研究的书面资料
  screeningcheck_3: Boolean,
  // 患者在知情同意书上签字
  screeningcheck_4: Boolean,
  // 在病例报告表中登记受试者人口学资料
  screeningcheck_5: Boolean,
  // 在病例报告表中记录受试者病史
  screeningcheck_6: Boolean,
  // 在病例报告表中记录受试者合并用药情况
  screeningcheck_7: Boolean,
  // 向受试者下医嘱行术前肠道清洁
  screeningcheck_8: Boolean,
  // 诊断方法、结果记录在病
  screeningcheck_9: Boolean
});

screeningChecklistSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('ScreeningChecklist', screeningChecklistSchema);
