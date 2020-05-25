const additionalInfoService = require('../services/additionalInfoService');
const candidateStatusService = require('../services/candidateStatusService');

module.exports.preSaveAdditionalInfo = async (req,res,next) => {
   const addiotnalInfo = await additionalInfoService.create(req.body.additionalInfo);
   console.log(addiotnalInfo);
   req.body.additionalInfo = addiotnalInfo._id;
   next();
}  

module.exports.preSaveCandidateStatus = async (req,res,next) => {
   const candidateStatus = await candidateStatusService.create(req.body.candidateStatus);
   req.body.candidateStatus = candidateStatus._id;
   next();
}