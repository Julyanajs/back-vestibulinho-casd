const RoomModel = require('../models/RoomModel');

class RoomService{
   
   toObject(RoomModel){
      return RoomModel ? RoomModel.toObject() : null;
   }

   async create(RoomData){
      let roomExists = await RoomModel.exists({name_room: RoomData.name_room});
      if (roomExists)
         return null;
      const Room = new RoomModel(RoomData);
      return this.toObject(await Room.save()) 
   }


   async updateById(RoomData){
      const RoomExists = await RoomModel.exists({_id: RoomData._id})
      if(!RoomExists)
         return
      RoomModel.patchUpdate({_id:RoomData._id}, RoomData);
   }

   async deleteById({_id}){
      await RoomModel.deleteOne({_id});
   }
   
    async getByName({name_room}){
      return await RoomModel.findOne({name_room}).lean();
   }
   
   async updateByName(RoomData) {
      let roomExists = await RoomModel.exists({name_room: RoomData.name_room});
      if (!roomExists)
         return null;
      return await RoomModel.patchUpdate({name_room: RoomData.name_room}, RoomData);
   }
async getAll(query) {
      return await RoomModel.find(query).lean();
   }
   
   async deleteByName({name_room}) {
      let roomExists = await RoomModel.exists({name_room});
      if (!roomExists)
         return null;
      return await RoomModel.deleteOne({name_room});
   }


}

const RoomServiceInstance = new RoomService;
module.exports = RoomServiceInstance;