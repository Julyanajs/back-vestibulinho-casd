const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoosePatchUpdate = require('mongoose-patch-update');
const nconf = require('nconf');
const autoIncrement = require('mongoose-plugin-autoinc');
require('mongoose-type-email');

///Schema declaration
const CandidateSchema = new mongoose.Schema({
   _id:{
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      description: "Auto generated id for the submitted form"
   },

   canidateNumber:{
      type: mongoose.Schema.Types.Number,
      description: "Numero de matricula autoincremental"
   },

   name:{
      type: mongoose.Schema.Types.String,
      required: true,
      description: "Nome do candidato"
   },

   rg:{
      type: mongoose.Schema.Types.String,
      required: true,
      description: "RG do candidato"
   },

   cpf:{
      type: mongoose.Schema.Types.String,
      required: false,
      description: "CPF do candidato"
   },

   email:{
      type: mongoose.Schema.Types.String,
      required: true,
      description: "Email para contato com o candidato"
   },

   additionalInfo:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdditionalInfo',
      description: "Informações adicionais do candidato"
   },

   candidateStatus:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CandidateStatus',
      description: "Status do candidato"
   }
}, {
   timestamps: true
 });

///Index Creation
CandidateSchema.index({createdAt: 1});
CandidateSchema.index({createdAt: -1});

//Defining Protected Attributes
//A principio estou deixando todos protegidos (Usuário não pode mudar sua inscrição)
const protectedAttributes = [ 
   'name',
   'rg',
   'cpf',
   'email'
];

//Defining sortable attributes
const sortableAttributes = [
   'createdAt'
];

//Creating the Schema BoilerPlate
CandidateSchema.statics.getProtectedAttributes = () => protectedAttributes;
CandidateSchema.statics.getSortableAttributes = () => sortableAttributes;
CandidateSchema.plugin(mongoosePaginate);
CandidateSchema.plugin(mongoosePatchUpdate);
CandidateSchema.plugin(autoIncrement.plugin, {
   model: 'Candidate',
   field: 'candidateNumber',
   startAt: 2100000,
   incrementBy: 1
});

module.exports = mongoose.model('Candidate',CandidateSchema);