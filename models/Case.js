const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const caseSchema = new Schema({
  /**
   * COMMON
   */
  // 受试者识别号码
  _id: {
    type: String,
    required: 'You must supply a subject id'
  },
  // 临床实验代码
  studyid: {
    type: String,
    default: 'CREX-005'
  },
  // 建档人
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply a userid'
  },
  // 中心编号
  siteid: {
    type: mongoose.Schema.ObjectId,
    ref: 'Site',
    required: false
  },
  // 建档日期
  createDate: {
    type: Date,
    default: Date.now
  }
});

caseSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Case', caseSchema);
