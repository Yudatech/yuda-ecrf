const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const visitSchema = new Schema({
  case: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid',
  },
  assessmentdtc: {
    type: Date,
    default: Date.now,
  },
  postoperative_1: Boolean,
  postoperative_2: Number,
  postoperative_2_1: Number,
  postoperative_2_1_1: Number,
  postoperative_2_1_2: Number,
  postoperative_2_1_3: Number,
  postoperative_2_1_4: Number,
  postoperative_2_1_5: Number,
  postoperative_2_1_6: Number,
  postoperative_2_1_7: Number,
  postoperative_2_1_8: Number,
  postoperative_2_1_9: Number,
  postoperative_2_1_10: Number,
  postoperative_2_1_11: Number,
  postoperative_2_1_12: Number,
  postoperative_2_1_13: Number,
  postoperative_2_1_14: Number,
  postoperative_2_1_15: Number,
  postoperative_2_1_16: Number,
  postoperative_2_1_17: Number,
  postoperative_2_1_18: Number,
  postoperative_2_1_18_1: String,
});

visitSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Visit', visitSchema);
