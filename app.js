const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoosePatchUpdate = require('mongoose-patch-update');
const CandidateController = require('./controllers/CandidateController');
const nconf = require('nconf');
const defaultConfig = require("./config/defaultConfig.json");
const shell = require('shelljs');
const autoIncrement = require('mongoose-auto-increment');
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
   autoIncrement.initialize(connection);
}).catch( err => {
   console.log('error connecting to MongoDB');
   process.exit();
});


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/candidate',CandidateController);
app.listen(nconf.get());