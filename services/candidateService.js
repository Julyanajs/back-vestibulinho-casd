const CandidateModel = require('../models/CandidateModel');

class CandidateService {
   
   toObject(CandidateModel){
      return CandidateModel ? CandidateModel.toObject() : null;
   }
   
   async create(CandidateData){
      let candidateExists = await CandidateModel.exists({rg: CandidateData.rg});
      if (candidateExists)
         return null;
      const Candidate = new CandidateModel(CandidateData);
      return this.toObject(await Candidate.save()) 
   }

   async getAll() {
      return await CandidateModel.find().lean();
   }

   async getById({_id}){
      return await CandidateModel.findById(_id).lean();
   }

   async getByRg({rg}){
      return await CandidateModel.findOne({rg}).lean();
   }

   async updateByRg(CandidateData) {
      let candidateExists = await CandidateModel.exists({rg: CandidateData.rg});
      if (!candidateExists)
         return null;
      return await CandidateModel.replaceOne({rg: CandidateData.rg}, CandidateData)
   }

   async deleteByRg({rg}) {
      let candidateExists = await CandidateModel.exists({rg});
      if (!candidateExists)
         return null;
      return await CandidateModel.deleteOne({rg});
   }

   async deleteAll() {
      return await CandidateModel.deleteMany();
   }
}

const CandidateServiceInstance = new CandidateService();
module.exports = CandidateServiceInstance