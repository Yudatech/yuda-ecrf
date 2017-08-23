const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const questionSchema = new Schema({
  // case id
  case: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid'
  },
  secondaryid: {
    type: String,
    default: ''
  },
  modelname: String,
  fieldname: String,
  // 发起人
  orig: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an orig userid'
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an owner userid'
  },
  status: Number
}, {
  timestamps: true
});

function autopopulate(next) {
  this.populate('case');
  this.populate('orig');
  next();
}

questionSchema.pre('find', autopopulate);
questionSchema.pre('findOne', autopopulate);
questionSchema.pre('findById', autopopulate);

questionSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Question', questionSchema);
