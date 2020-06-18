const CandidateStatusModel = require('../models/CandidateStatusModel');

class CandidateStatusSerivce{
   
   toObject(CandidateStatusModel){
      return CandidateStatusModel ? CandidateStatusModel.toObject() : null;
   }

   async create(candidateStatusData){
      const candidateStatus = new CandidateStatusModel(candidateStatusData);
      return this.toObject(await candidateStatus.save()) 
   }

   async updateById(candidateStatusData){
      const candidateStatusExists = await CandidateStatusModel.exists({_id: candidateStatusData._id})
      if(!candidateStatusExists)
         return
      CandidateStatusModel.patchUpdate({_id:candidateStatusData._id}, candidateStatusData);
   }

   async deleteById({_id}){
      await CandidateStatusModel.deleteOne({_id});
   }

}

const candidateStatusServiceInstance = new CandidateStatusSerivce;
module.exports = candidateStatusServiceInstance;