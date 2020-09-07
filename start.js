const mongoose = require("mongoose");
const http = require("http");
const https = require("https");
const fs = require("fs");

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split(".").map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log(
    "🛑 🌮 🐶 💪 💩\nHey You! \n\t ya you! \n\t\tBuster! \n\tYou're on an older version of node that doesn't support the latest and greatest things we are learning (Async + Await)! Please go to nodejs.org and download version 7.6 or greater. 👌\n "
  );
  process.exit();
}

// import environmental variables from our variables.env file
require("dotenv").config({ path: "variables.env" });

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// READY?! Let's go!

// import all models
require("./models/User");
require("./models/Site");
require("./models/Case");
require("./models/Screening");
require("./models/ReviewChecklist");
require("./models/Discontinuation");
require("./models/Surgery");
require("./models/Life");
require("./models/Cm");
require("./models/Ae");
require("./models/Sae");
require("./models/Visit");
require("./models/Question");
require("./models/History");
require("./models/Evacuation");

// Start our app!
const app = require("./app");
// app.set('port', process.env.PORT || 7777);
// const server = app.listen(app.get('port'), () => {
//   console.log(`Express running → PORT ${server.address().port}`);
// });

// const serverHttp = http
//   .createServer(app)
//   .listen(process.env.PORT || 7777, () => {
//     console.log(`Express running → PORT ${serverHttp.address().port}`);
//   });

// set up plain http server
var serverHttp = express.createServer();

// set up a route to redirect http to https
serverHttp.get('*', function (req, res) {
  res.redirect('https://' + req.headers.host + req.url);

  // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
  // res.redirect('https://example.com' + req.url);
})

// have it listen on 8080
serverHttp.listen(process.env.PORT || 7777, () => {
  console.log(`Express running → PORT ${serverHttp.address().port}`);
});

// start https server
let sslOptions = {
  key: fs.readFileSync("cert/yuda-ecrf.key"),
  cert: fs.readFileSync("cert/yuda-ecrf.cert"),
  ca: fs.readFileSync("cert/yuda-ecrf.ca-bundle"),
};

let serverHttps = https
  .createServer(sslOptions, app)
  .listen(process.env.HTTPS_PORT || 443, () => {
    console.log(`Express running → PORT ${serverHttps.address().port}`);
  });
