const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const numberWithIntValidate = {
  type: Number,
  validate: [validator.isInt, 'Int value required.']
};

const numberWithFloatValidate = {
  type: Number,
  validate: [validator.isFloat, 'Float value required.']
};

const surgerySchema = new Schema({
  caseid: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid'
  },
  /**
   * SURGERY
   */
  // C-REX LapAid型号
  device_1: numberWithIntValidate,
  // C-REX DMH/DMHC型号
  device_2: numberWithIntValidate,
  // 肠切除术-Descending colon
  surgery_1: Boolean,
  // 肠切除术-Sigmoid colon
  surgery_2: Boolean,
  // 肠切除术-Rectum
  surgery_3: Boolean,
  // 肿瘤距离肛门
  surgery_4: numberWithFloatValidate,
  // 肿瘤大小-长度(cm)
  surgery_5: numberWithFloatValidate,
  // 肿瘤大小-宽度(cm)
  surgery_6: numberWithFloatValidate,
  // 肿瘤浸润范围
  surgery_7: String,
  // 吻合方式
  surgery_8: numberWithIntValidate,
  // 手术方式
  surgery_9: numberWithIntValidate,
  // 术中吻合口完整性压力
  surgery_10: numberWithFloatValidate,
  // 肛门外监测导管长度(若使用DMC)
  surgery_11: numberWithFloatValidate,
  // 手术时间
  surgery_12: numberWithIntValidate,
  // 术中出血量
  surgery_13: numberWithFloatValidate,
  // 不良事件
  surgery_14: Boolean,
  // 术中发现肠管直径异常或肠管壁厚度异常，例如憩室炎，慢性的肠梗阻
  surgery_15: Boolean,
  // 术中发现癌扩散
  surgery_16: Boolean,
  // 其他
  surgery_17: Boolean,
  // 其他，请注明原因
  surgery_18: String
});

surgerySchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Surgery', surgerySchema);
