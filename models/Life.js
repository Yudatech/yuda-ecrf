const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const lifeSchema = new Schema({
  case: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid'
  },
  /**
   * Life quality
   */
  assessmentdtc: {
    type: Date
  },
  life_1: Number,
  healthcare_1: Boolean,
  healthcare_1_1: Number,
  healthcare_2: Boolean,
  healthcare_2_1: Number,
  healthcare_2_2: Number,
  healthcare_2_3: String,
  healthcare_3: Boolean,
  healthcare_3_1: Number,
});

lifeSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Life', lifeSchema);
