const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const pathologicalSchema = new Schema({
  case: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid'
  },
  /**
   * REVIEW_CHECKLIST
   */
  pathological_1: String
});

pathologicalSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Pathological', pathologicalSchema);
