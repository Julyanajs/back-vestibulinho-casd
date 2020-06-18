const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoosePatchUpdate = require('mongoose-patch-update');
const CandidateController = require('./controllers/candidateController');
const additionalInfoController = require('./controllers/additionalInfoController');
const RoomController = require('./controllers/roomController');
const nconf = require('nconf');
const defaultConfig = require("./config/defaultConfig");
const shell = require('shelljs');
const cors = require('cors')
const app = express();
const morgan = require('morgan');
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

//Setting up morgan
app.use(morgan('combined'));

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/candidate',CandidateController);
app.use('/additionalInfo',additionalInfoController);
app.use('/room',RoomController);

app.listen(nconf.get());
