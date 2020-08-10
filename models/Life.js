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
  healthcare_3: Boolean,
  healthcare_3_1: Number,
  healthcare_4: Boolean,
  healthcare_4_1: String,
  procedure_1: Boolean,
  procedure_1_1: Number,
  procedure_2: Boolean,
  procedure_2_1: Number,
  procedure_3: Boolean,
  procedure_3_1: Number,
  procedure_4: Boolean,
  procedure_4_1: Number,
  complications_1: Boolean,
  complications_1_1: Number,
  complications_2: Boolean,
  complications_2_1: Number,
  complications_3: Boolean,
  complications_3_1: Number,
  complications_4: Boolean,
  complications_4_1: Number,
  complications_5: Boolean,
  complications_5_1: Number
});

lifeSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Life', lifeSchema);
