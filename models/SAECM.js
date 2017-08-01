const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const saecmSchema = new Schema({
  caseid: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid'
  },
  /**
   * SAECM
   */
  // 疾病
  saecmdisease: String,
  // 治疗药物
  saecmdrug: String,
  // 用法用量
  saecmdosing: String
});

saecmSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Saecm', saecmSchema);
