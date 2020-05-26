const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoosePatchUpdate = require('mongoose-patch-update');
require('mongoose-type-email');

///Schema declaration 
const additionalInfoSchema = new mongoose.Schema({

   _id:{
      type:mongoose.Schema.Types.ObjectId,
      auto:true,
      description:"Auto generated id for the submitted form"
   },

   birthDate: {
      type: mongoose.Schema.Types.String,
      required: true,
      decription: "Data de nascimento no formato DD/MM/AAAA"
   },

   gender:{
      type:mongoose.Schema.Types.String,
      required:true,
      description:"Gênero que o candidato se auto-declara"
   },

	relativeName:{
      type:mongoose.Schema.Types.String,
      required:true,
      description:"Nome Responsável"
   },

   kinship:{
      type:mongoose.Schema.Types.String,
      required:true,
      description:"Parentesco Responsável"
   },
   
   phone1:{
      type:mongoose.Schema.Types.String,
      required:true,
      description:"Telefone 1 (Obrigatório)"
   },

   phone2:{
      type:mongoose.Schema.Types.String,
      required:false,
      description:"Telefone 2 (Não Obrigatório)"
   },
   	
	address:{
      additionalAddress:{type:mongoose.Schema.Types.String,required:false,description:"Complemento Endereço"},
      street:{type:mongoose.Schema.Types.String,required:false,description:"Nome da Rua"},
      numberStreet:{type:mongoose.Schema.Types.Number,required:true,description:"Número da Rua"},
      neighborhood:{type:mongoose.Schema.Types.String,required:true,description:"Bairro"},
      city:{type:mongoose.Schema.Types.String,required:true,description:"Cidade"},
      state:{type:mongoose.Schema.Types.String,required:true,description:"Estado"},
      cep: {type: mongoose.Schema.Types.String, required:true, description:"CEP"}
   },

   ifSpecialNecessity:{
      type:mongoose.Schema.Types.String,
      required:true,
      description:"Se o candidato tem necessidade especial"
   },
   
   whichNecessity:{
      type:mongoose.Schema.Types.String,
      required:false,
      description:"Qual necessidade especial (se tiver)"
   },

   schooling:{
      type:mongoose.Schema.Types.String,
      required:true,
      description:"Qual a escolaridade do candidato"
   },
   
	school:{
      type:mongoose.Schema.Types.String,
      required:true,
      description:"Qual escola o aluno estudou"
   },

	kindSchool:{
      type:mongoose.Schema.Types.String,
      required:true,
      description:"Qual tipo Escola"
   },  

	wayPS:{
      type:mongoose.Schema.Types.String,
      required:true,
      description:"Qual tipo Escola"
   },      
}, {
   timestamps:true
});

///Index Creation
additionalInfoSchema.index({createdAt:1});
additionalInfoSchema.index({createdAt:-1});

//Defining Protected Attributes
//A principio estou deixando todos protegidos (Usuário não pode mudar sua inscrição)
const protectedAttributes = [ 
   "_id",
];

//Defining sortable attributes
const sortableAttributes = [
   'createdAt',
];

//Creating the Schema BoilerPlate
additionalInfoSchema.statics.getProtectedAttributes = () => protectedAttributes;
additionalInfoSchema.statics.getSortableAttributes = () => sortableAttributes;
additionalInfoSchema.plugin(mongoosePaginate);
additionalInfoSchema.plugin(mongoosePatchUpdate);
module.exports = mongoose.model('AdditionalInfo',additionalInfoSchema);