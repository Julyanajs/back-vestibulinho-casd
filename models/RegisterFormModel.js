const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoosePatchUpdate = require('mongoose-patch-update');

const RegisterFormSchema = new mongoose.Schema({
   _id : {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      description: "Auto generated id for the submitted form"
   },

   //Create registrationNumber field with the autoIncrement plugin. Gotta setup the mongoose connection to do that
   //registrationNumber: {
      
   //}

})