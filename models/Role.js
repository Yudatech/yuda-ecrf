const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const roleSchema = new Schema({
  userid: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply a userid'
  },
  role: {
    type: String,
    required: 'You must supply a role',
    enum: {
      values: ['cra', 'supervisor', 'monitor', 'admin'],
      message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
    }
  },
  siteid: {
    type: mongoose.Schema.ObjectId,
    ref: 'Site',
    required: false
  }
});

roleSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Role', roleSchema);
