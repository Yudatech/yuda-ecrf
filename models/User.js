const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address'
  },
  username: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  userabbr: {
    type: String,
    unique: true
  },
  tel: {
    type: String
  },
  role: {
    type: String,
    required: 'You must supply a role',
    enum: {
      values: ['cra', 'supervisor', 'monitor', 'admin'],
      message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
    }
  },
  site: {
    type: mongoose.Schema.ObjectId,
    ref: 'Site',
    required: false
  }
});

userSchema.virtual('gravatar').get(function() {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

function autopopulate(next) {
  this.populate('site');
  next();
}

userSchema.pre('find', autopopulate);
userSchema.pre('findOne', autopopulate);

userSchema.plugin(passportLocalMongoose, {usernameField: 'username'});
userSchema.plugin(mongodbErrorHandler);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
