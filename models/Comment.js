const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const commentSchema = new Schema({
  // case id
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
  text: {
    type: String,
    required: true
  },
  // 创建日期
  createDate: {
    type: Date,
    default: Date.now
  }
});

function autopopulate(next) {
  this.populate('user');
  next();
}

commentSchema.pre('find', autopopulate);
commentSchema.pre('findOne', autopopulate);
commentSchema.pre('findById', autopopulate);

commentSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Comment', commentSchema);
