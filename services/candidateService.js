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

   async getAll(query) {
      return await CandidateModel.find().lean().populate('additionalInfo');
   }

   async getPage(query){
      const defaultOptions = {
         page: 1,
         limit: 10,
         populate:[
            "additionalInfo",
            "candidateStatus"
         ]
      }
      const defaultQuery = {}
      if(query.page <= 0)
         query.page = defaultOptions.page;
      if(limit <= 0)
         query.limit = defaultOptions.limit;
      
      return await CandidateModel.paginate({...defaultQuery},{...defaultOptions, ...query});
   }

   async populateAll() {
	   const listCandidates = await CandidateModel.find();
	 
	   const populatedList = await listCandidates.map(async  p=> {
		   console.log(p)
		   p = await p.populate('additionalInfo');
         console.log(p)
         p = await p.populate('candidateStauts');
	   });
	 return populatedList;
   }
   
   async getById({_id}){
      return await CandidateModel.findById(_id).populate('additionalInfo').populate('candidateStatus').lean();
   }

   async getByRg({rg}){
      return await CandidateModel.findOne({rg}).populate('additionalInfo').populate('candidateStatus').lean();
   }

   async updateByRg(CandidateData) {
      let candidateExists = await CandidateModel.exists({rg: CandidateData.rg});
      if (!candidateExists)
         return null;
      return await CandidateModel.patchUpdate({rg: CandidateData.rg}, CandidateData);
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