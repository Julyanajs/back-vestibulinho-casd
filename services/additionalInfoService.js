const additionalInfoModel = require('../models/AdditionalInfoModel');

class additionalInfoService {
   
   toObject(additionalInfoModel){
      return additionalInfoModel ? additionalInfoModel.toObject() : null;
   }
   
   async create(additionalInfoData){
      console.log(additionalInfoData);
      const additionalInfo = new additionalInfoModel(additionalInfoData);
      return this.toObject(await additionalInfo.save()) 
   }

   async updateById(additionalInfoData){
      const additionalInfoExists = await additionalInfoModel.exists({_id:additionalInfoData._id})
      if(!additionalInfoExists)
         return;
      additionalInfoModel.patchUpdate({_id:additionalInfoData._id}, additionalInfoData);
   }

   async getById({_id}){
      return await additionalInfoModel.findById(_id).lean();
   }

   async getByCep({cep}){
      return await additionalInfoModel.findOne({cep}).lean();
   }

   async deleteById({_id}){
      await additionalInfoModel.deleteOne({_id});
   }
}

const additionalInfoServiceInstance = new additionalInfoService();
module.exports = additionalInfoServiceInstance