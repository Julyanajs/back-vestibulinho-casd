const CandidateModel = require('../models/CandidateModel');

class CandidateService {
   
   toObject(CandidateModel){
      return CandidateModel ? CandidateModel.toObject() : null;
   }
   
   async create(CandidateData){
      const Candidate = new CandidateModel(CandidateData);
      return this.toObject(await Candidate.save()) 
   }

   async getById({_id}){
      return await CandidateModel.findById(_id).lean();
   }

   async getByRg({rg}){
      return await CandidateModel.findOne({rg}).lean();
   }

   async deleteById({_id}){
      await CandidateModel.deleteOne({_id});
   }
}

const CandidateServiceInstance = new CandidateService();
module.exports = CandidateServiceInstance