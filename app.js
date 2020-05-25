const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoosePatchUpdate = require('mongoose-patch-update');
const CandidateController = require('./controllers/CandidateController');
const additionalInfoController = require('./controllers/additionalInfoController');
const nconf = require('nconf');
const defaultConfig = require("./config/defaultConfig");
const shell = require('shelljs');
const cors = require('cors')
const app = express();

//Setting up mongodb
shell.exec('./runMongoDB.sh');

//Storing constants in nconf
nconf.defaults({store: {...defaultConfig}});

//Setting-up Mongoose
mongoose.plugin(mongoosePatchUpdate);
mongoose.Promise = global.Promise;

//Connecting to mongoose
mongoose.connect(nconf.get("dbConfig:url"),{
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then( connection => {
   console.log('Successfully connected to Mongodb')
}).catch( err => {
   console.log('error connecting to MongoDB');
   console.log(err);
   process.exit();
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/candidate',CandidateController);
app.use('/additionalInfo',additionalInfoController);

app.listen(nconf.get());
