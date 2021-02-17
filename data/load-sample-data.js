require('dotenv').config({ path: __dirname + '/../variables.env' });
const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once

const Case = require("../models/Case");
const Screening = require("../models/Screening");
const ReviewChecklist = require("../models/ReviewChecklist");
const Discontinuation = require("../models/Discontinuation");
const Surgery = require("../models/Surgery");
const Life = require("../models/Life");
const Ae = require("../models/Ae");
const Sae = require("../models/Sae");
const Visit = require("../models/Visit");
const Question = require("../models/Question");
const History = require("../models/History");
const Evacuation = require("../models/Evacuation");
const Pathological = require("../models/Pathological");
const Followup = require("../models/Followup");


const users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'));

async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  await Case.remove();
  await Screening.remove();
  await ReviewChecklist.remove();
  await Discontinuation.remove();
  await Surgery.remove();
  await Life.remove();
  await Ae.remove();
  await Sae.remove();
  await Visit.remove();
  await Question.remove();
  await History.remove();
  await Evacuation.remove();
  await Pathological.remove();
  await Followup.remove();
  console.log('Data Deleted. To load sample data, run\n\n\t npm run sample\n\n');
  process.exit();
}

async function loadData() {
  try {
    await User.insertMany(users);
    console.log('👍👍👍👍👍👍👍👍 Done!');
    process.exit();
  } catch (e) {
    console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n');
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
