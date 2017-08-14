const moment = require('moment');
moment.locale('zh-cn');

const mongoose = require('mongoose');
const Ae = mongoose.model('Ae');

const helpers = require('./helpers');
const getAeConfig = require('../config/ae/getAeConfig');
const getAeTableConfig = require('../config/ae/getAeTableConfig');
const getAeLevelConfig = require('../config/ae/getAeLevelConfig');
const getAeRelConfig = require('../config/ae/getAeRelConfig');
const getAeResConfig = require('../config/ae/getAeResConfig');
const getButtonConfig = require('../config/common/getButtonConfig');
