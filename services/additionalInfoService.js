const additionalInfoModel = require('../models/AdditionalInfoModel');

class additionalInfoService {
   
   toObject(additionalInfoModel){
      return additionalInfoModel ? additionalInfoModel.toObject() : null;
   }
   
   async create(additionalInfoData){
      const additionalInfo = new additionalInfoModel(additionalInfoData);
      return this.toObject(await additionalInfo.save()) 
   }

   async getById({_id}){
      return await additionalInfoModel.findById(_id).lean();
   }

   async getBycep({cep}){
      return await additionalInfoModel.findOne({cep}).lean();
   }

   async deleteById({_id}){
      await additionalInfoModel.deleteOne({_id});
   }
}

const additionalInfoServiceInstance = new additionalInfoService();
module.exports = additionalInfoServiceInstance