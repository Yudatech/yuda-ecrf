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
    ref: 'Site'
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
  auditBy: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  lockBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: {
      values: ['open', 'committed', 'audited', 'locked', 'quit'],
      message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
    },
    default: 'open'
  }
});

caseSchema.method('audit', function(auditorId, cb) {
  const auditBy = this.toObject().auditBy;
  const match = auditBy.find((item) => item.toString() === auditorId.toString());
  if (match !== undefined) {
    cb('You can not audit a case twice!');
  }
  else {
    auditBy.push(auditorId);
    this.auditBy = auditBy;
    if (auditBy.length === 2) {
      this.status = 'audited';
    }
    this.save(cb);
  }
});

caseSchema.method('lock', function(adminId, cb) {
  const lockBy = this.toObject().lockBy;
  if (lockBy !== undefined) {
    cb('Case already locked!');
  }
  else {
    this.lockBy = adminId;
    this.status = 'locked';
    this.save(cb);
  }
});

function autopopulate(next) {
  this.populate('user');
  this.populate('site');
  next();
}

caseSchema.pre('find', autopopulate);
caseSchema.pre('findOne', autopopulate);
caseSchema.pre('findById', autopopulate);

caseSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Case', caseSchema);
