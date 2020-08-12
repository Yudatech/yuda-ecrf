const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const evacuationSchema = new Schema({
  case: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid'
  },
  evacuationdtc: {
    type: Date
  },
  evacuationtype: Number,
  evacuation_1: String
});

evacuationSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Evacuation', evacuationSchema);
