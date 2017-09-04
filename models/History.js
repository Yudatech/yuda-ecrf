const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const historySchema = new Schema({
  // case id
  case: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid'
  },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: 'Question',
    required: 'You must supply a questionid'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an orig userid'
  },
  content: mongoose.Schema.Types.Mixed,
  comment: {
    type: String,
    required: true
  },
  status: Number,
  // 创建日期
  createDate: {
    type: Date,
    default: Date.now
  }
});

function autopopulate(next) {
  this.populate('user');
  this.populate('case');
  this.populate('question');
  next();
}

historySchema.pre('find', autopopulate);
historySchema.pre('findOne', autopopulate);
historySchema.pre('findById', autopopulate);

historySchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('History', historySchema);
