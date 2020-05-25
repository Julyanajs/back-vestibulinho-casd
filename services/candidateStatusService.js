const CandidateStatusModel = require('../models/CandidateStatusModel');

class CandidateStatusSerivce{
   
   toObject(CandidateStatusModel){
      return CandidateStatusModel ? CandidateStatusModel.toObject() : null;
   }

   async create(candidateStatusData){
      const candidateStatus = new CandidateStatusModel(candidateStatusData);
      return this.toObject(await candidateStatus.save()) 
   }

}

const candidateStatusServiceInstance = new CandidateStatusSerivce;
module.exports = candidateStatusServiceInstance;