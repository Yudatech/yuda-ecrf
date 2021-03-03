const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const evacuationFollowupSchema = new Schema({
  case: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid',
  },
  assessmentdtc: {
    type: Date,
    default: Date.now,
  },
  status_1: Boolean,
  status_2: Boolean,
  status_3: Boolean,
  status_4: Boolean,
  status_5: Boolean,
});

evacuationFollowupSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('EvacuationFollowup', evacuationFollowupSchema);
