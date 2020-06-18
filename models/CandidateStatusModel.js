const mongoose = require('mongoose');
const mongoosePatchUpdate = require('mongoose-patch-update');
const mongoosePaginate = require('mongoose-paginate-v2');

const CandidateStatusSchema = new mongoose.Schema({
   _id:{
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      description: "Id do Schema"
   },
   
   registrationStatus:{
      type: mongoose.Schema.Types.Boolean,
      default: true,
      description: "Booleana que diz se a inscrição está ativa ou não"
   },

   exemptionStatus: {
      type: mongoose.Schema.Types.Boolean,
      required: false,
      description: "Booleana que diz se a pessoa esta isenta de pagar a inscrição"
   },

   testPresence:{
      type: mongoose.Schema.Types.Boolean,
      required: false,
      description: "Booleana que fala se a pessoa esteve presente"
   },



   roomId: {
      type: mongoose.Schema.Types.String,
      required: false,
      description: "Sala de prova do candidato"
   },

   grade: {
      type: mongoose.Schema.Types.Number,
      required: false,
      description: "Nota do candidato"
   },

   esDate: {
      type: mongoose.Schema.Types.String,
      required: false,
      description: "Data que o aluno deve se apresentar para a entrevista socioeconômica"
   },

   esTime: {
      type: mongoose.Schema.Types.String,
      required: false,
      description: "Horário em que o aluno deve se apresentar para a entrevista socioeconômica na data escolhida"
   },

   esPresence: {
      type: mongoose.Schema.Types.String,
      required: false,
      description: "Booleana que diz se a pessoa esteve presente na entrevista socioeconômica"
   },

   esResult: {
      type: mongoose.Schema.Types.Boolean,
      required: false,
      description: "Status de aprovação na entrevista socioeconômica",
   },


   summonNumber:{
      type: mongoose.Schema.Types.Number,
      required: false,
      description: "Número da chamada para matrícula do aluno"
   },

   enrollSatus:{
      type: mongoose.Schema.Types.Boolean,
      required: false,
      description: "Se o aluno está matriculado ou não no curso"
   }
}, {
   timestamps: true
});

///Index Creation
CandidateStatusSchema.index({createdAt: 1});
CandidateStatusSchema.index({createdAt: -1});

//Defining Protected Attributes
//A principio estou deixando todos protegidos (Usuário não pode mudar sua inscrição)
const protectedAttributes = [];

//Defining sortable attributes
const sortableAttributes = [
   'createdAt'
];

//Creating the Schema BoilerPlate
CandidateStatusSchema.statics.getProtectedAttributes = () => protectedAttributes;
CandidateStatusSchema.statics.getSortableAttributes = () => sortableAttributes;
CandidateStatusSchema.plugin(mongoosePaginate);
CandidateStatusSchema.plugin(mongoosePatchUpdate);


module.exports = mongoose.model('CandidateStatus',CandidateStatusSchema);