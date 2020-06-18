const mongoose = require('mongoose');
const mongoosePatchUpdate = require('mongoose-patch-update');
const mongoosePaginate = require('mongoose-paginate-v2');

const RoomSchema = new mongoose.Schema({
   _id:{
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      description: "Id do Schema"
   },
   
   name_room:{
      type: mongoose.Schema.Types.String,
      required: true,
      description: "Número da Sala"
   },

   studentsNumber: {
      type: mongoose.Schema.Types.Number,
      required: true,
      description: "Número de Alunos na Sala"
   },
}, {
   timestamps: true
});

///Index Creation
RoomSchema.index({createdAt: 1});
RoomSchema.index({createdAt: -1});

//Defining Protected Attributes
//A principio estou deixando todos protegidos (Usuário não pode mudar sua inscrição)
const protectedAttributes = ['name_room'];

//Defining sortable attributes
const sortableAttributes = [
   'createdAt'
];

//Creating the Schema BoilerPlate
RoomSchema.statics.getProtectedAttributes = () => protectedAttributes;
RoomSchema.statics.getSortableAttributes = () => sortableAttributes;
RoomSchema.plugin(mongoosePaginate);
RoomSchema.plugin(mongoosePatchUpdate);


module.exports = mongoose.model('RoomSchema',RoomSchema);