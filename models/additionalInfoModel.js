const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoosePatchUpdate = require('mongoose-patch-update');
require('mongoose-type-email');

///Schema declaration 





const additionalInfoSchema = new mongoose.Schema({
   _id : {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      description: "Auto generated id for the submitted form"
   },

	nomeResponsavel : {
      type: mongoose.Schema.Types.String,
      required: true,
      description: "Nome Responsável"
   },
   parentesco : {
      type: mongoose.Schema.Types.String,
      required: true,
      description: "Parentesco Responsável"
   },
   
   telefone1 : {
      type: mongoose.Schema.Types.String,
      required: true,
      description: "Telefone 1 (Obrigatório)"
   },

   telefone2 : {
      type: mongoose.Schema.Types.String,
      required: false,
      description: "Telefone 2 (Não Obrigatório)"
   },

   cep : {
      type: mongoose.Schema.Types.String,
      required: true,
      description: "CEP Endereço"
   },
   	
	endereco:{
	complementoEndereco:{type:mongoose.Schema.Types.String,required:false,description:"Complemento Endereço"},
	rua:{type:mongoose.Schema.Types.String,required:false,description:"Nome da Rua"},
	numeroRua:{type:mongoose.Schema.Types.Number,required:true,description:"Número da Rua"},
	bairro:{type:mongoose.Schema.Types.String,required:true,description:"Bairro"},
	cidade:{type:mongoose.Schema.Types.String,required:true,description:"Cidade"},
	estado:{type:mongoose.Schema.Types.String,required:true},description:"Estado"},

   seNecessidadeEspecial : {
      type: mongoose.Schema.Types.Boolean,
      required: true,
      description: "Se o candidato tem necessidade especial"
   },
   
   qualNecessidade : {
      type: mongoose.Schema.Types.String,
      required: false,
      description: "Qual necessidade especial (se tiver)"
   },

   escolaridade : {
      type: mongoose.Schema.Types.String,
      required: true,
      description: "Qual a escolaridade do candidato"
   },
   
	escola : {
      type: mongoose.Schema.Types.String,
      required: true,
      description: "Qual escola o aluno estudou"
   },
	tipoEscola : {
      type: mongoose.Schema.Types.String,
      required: true,
      description: "Qual tipo Escola"
   },   
	formaPS : {
      type: mongoose.Schema.Types.String,
      required: true,
      description: "Qual tipo Escola"
   },      
}, {
   timestamps: true
 });

///Index Creation
additionalInfoSchema.index({createdAt: 1});
additionalInfoSchema.index({createdAt: -1});

//Defining Protected Attributes
//A principio estou deixando todos protegidos (Usuário não pode mudar sua inscrição)
const protectedAttributes = [ 
   'telefone1',
   'formaPS',
   'tipoEscola',
   'escola'
];

//Defining sortable attributes
const sortableAttributes = [
   'createdAt'
];

//Creating the Schema BoilerPlate
additionalInfoSchema.statics.getProtectedAttributes = () => protectedAttributes;
additionalInfoSchema.statics.getSortableAttributes = () => sortableAttributes;
additionalInfoSchema.plugin(mongoosePaginate);
additionalInfoSchema.plugin(mongoosePatchUpdate);
module.exports = mongoose.model('additionalInfo',additionalInfoSchema);