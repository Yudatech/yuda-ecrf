const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const followupSchema = new Schema({
  case: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid'
  },
  followup_1: Number,
  followup_2: Number,
  followup_3: Number,
  followup_4: Number,
  followup_5: Number,
  followup_6: Number,
  followup_7: Number,
  followup_8: Number,
  followup_9: Number,
  followup_10: Number,
  followup_11: Number,
  followup_12: Number,
  followup_13: Number,
  followup_14: Number,
  followup_15: Number,
  followup_16: Number,
  followup_17: Number,
  followup_18: Number,
  followup_18_1: String,
  followup_19: Number,
  followup_20: Number,
  followup_20_1: {
    type: Date
  },
  followup_20_2: {
    type: Date
  },
  followup_21: Number,
  followup_21_1: {
    type: Date
  },
  followup_21_2: {
    type: Date
  },
  followup_21_3: {
    type: Date
  },
  followup_21_4: {
    type: Date
  },
  followup_21_5_1: Boolean,
  followup_21_5_2: Boolean,
  followup_21_5_3: Boolean,
  followup_21_5_4: Boolean,
  followup_21_5_4_1: String,
  followup_22: Number,
  followup_22_1: String,
});

followupSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Followup', followupSchema);
