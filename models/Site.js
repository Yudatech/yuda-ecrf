const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const siteSchema = new Schema({
  sitemail: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address'
  },
  sitename: {
    type: String,
    required: 'Please supply a site name',
    trim: true
  },
  country: {
    type: String
  },
  sitetel: {
    type: String
  }
});

siteSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Site', siteSchema);
