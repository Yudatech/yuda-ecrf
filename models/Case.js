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
  // 受试者姓名
  subjname: {
    type: String
  },
  // 受试者姓名缩写
  subjabbr: {
    type: String
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
  site: {
    type: mongoose.Schema.ObjectId,
    ref: 'Site',
    required: 'You must supply a siteid'
  },
  // 建档日期
  createDate: {
    type: Date,
    default: Date.now
  },
  // 知情同意书签署日期
  subjAcceptDate: {
    type: Date,
    default: Date.now
  },
  attachedDoc: String,
  status: {
    type: String,
    enum: {
      values: ['open', 'committed', 'locked'],
      message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
    },
    default: 'open'
  }
});

function autopopulate(next) {
  this.populate('user');
  next();
}

caseSchema.pre('find', autopopulate);
caseSchema.pre('findOne', autopopulate);
caseSchema.pre('findById', autopopulate);

caseSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Case', caseSchema);
