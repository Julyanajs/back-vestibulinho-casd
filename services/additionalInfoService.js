const AdditionalInfoModel = require('../models/AdditionalInfoModel');

class AdditionalInfoService {
   
   toObject(AdditionalInfoModel){
      return AdditionalInfoModel ? AdditionalInfoModel.toObject() : null;
   }
   
   async create(additionalInfoData){
      console.log(additionalInfoData);
      const additionalInfo = new AdditionalInfoModel(additionalInfoData);
      return this.toObject(await additionalInfo.save()) 
   }

   async updateById(additionalInfoData){
      const additionalInfoExists = await AdditionalInfoModel.exists({_id:additionalInfoData._id})
      if(!additionalInfoExists)
         return;
      console.log(additionalInfoExists);
      const updatedInfo = await AdditionalInfoModel.patchUpdate({_id:additionalInfoData._id}, additionalInfoData);
      console.log("Updated info");
      console.log(updatedInfo);
   }

   async getById({_id}){
      return await AdditionalInfoModel.findById(_id).lean();
   }

   async getByCep({cep}){
      return await AdditionalInfoModel.findOne({cep}).lean();
   }

   async deleteById({_id}){
      await AdditionalInfoModel.deleteOne({_id});
   }
}

const AdditionalInfoServiceInstance = new additionalInfoService();
module.exports = AdditionalInfoServiceInstance