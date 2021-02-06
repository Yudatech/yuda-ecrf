const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const visitSchema = new Schema({
  case: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid'
  },
  assessmentdtc: {
    type: Date,
    default: Date.now
  },
  postoperative_1: Boolean,
  postoperative_2: Number,
  postoperative_2_1: Number,
  postoperative_2_1_1: Number,
});

visitSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Visit', visitSchema);
