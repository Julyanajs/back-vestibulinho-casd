const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoosePatchUpdate = require('mongoose-patch-update');
require('mongoose-type-email');

///Schema declaration
const RegistrationFormSchema = new mongoose.Schema({
   _id : {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      description: "Auto generated id for the submitted form"
   },

   name : {
      type: mongoose.Schema.Types.String,
      required: true,
      description: "Nome do candidato"
   },
   //registrationNumber deve ser criado com o plugin mongoose-auto-increment. Para isso preciso criar a conexão do db
   //registrationNumber: {
      
   //}

   gender : {
      type: mongoose.Schema.Types.String,
      required: false,
      description: "Gênero que o candidato se declara"
   },

   phoneNumberDDD : {
      type: mongoose.Schema.Types.String,
      required: true,
      description: "Telefone com DDD para o contato com o candidato"
   },

   email : {
      type: mongoose.Schema.Types.email,
      required: true,
      description: "Email para contato com o candidato"
   }
}, {
   timestamps: true
 });

///Index Creation
RegistrationFormSchema.index({createdAt: 1});
RegistrationFormSchema.index({createdAt: -1});

//Defining Protected Attributes
//A principio estou deixando todos protegidos (Usuário não pode mudar sua inscrição)
const protectedAttributes = [ 
   'name',
   'gender',
   'phoneNumberDDD',
   'email'
];

//Defining sortable attributes
const sortableAttributes = [
   'createdAt'
];

//Creating the Schema BoilerPlate
RegistrationFormSchema.statics.getProtectedAttributes = () => protectedAttributes;
RegistrationFormSchema.statics.getSortableAttributes = () => sortableAttributes;
RegistrationFormSchema.plugin(mongoosePaginate);
RegistrationFormSchema.plugin(mongoosePatchUpdate);
module.exports = model('RegistrationForm',RegistrationFormSchema);