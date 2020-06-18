const additionalInfoService = require('../services/additionalInfoService');
const candidateStatusService = require('../services/candidateStatusService');

module.exports.preSaveAdditionalInfo = async (req,res,next) => {
   const addiotnalInfo = await additionalInfoService.create(req.body);
   console.log(addiotnalInfo);
   req.body.additionalInfo = addiotnalInfo._id;
   next();
}  

module.exports.preSaveCandidateStatus = async (req,res,next) => {
   const candidateStatus = await candidateStatusService.create(req.body);
   console.log(candidateStatus);
   req.body.candidateStatus = candidateStatus._id;
   next();
}

module.exports.deleteAdditionalInfoIfError = async (req,res,next) => {
   if(res.body.createdOk)
      next();
   console.log(res.body);
   await candidateStatusService.deleteById({_id:req.body.candidateStatus});
   next();
}

module.exports.deleteCandidateStatusIfError = async(req,res,next) => {
   if(res.body.createdOk)
      next();
   console.log(res.body);
   await additionalInfoService.deleteById({_id: req.body.addiotnalInfo});
   next();
}

module.exports.posUpdateCandidateStauts = async(req, res, next) => {
   if(!res.body.udpatedOk)
      return;
   const candidateStautsData = req.body;
   candidateStatusData._id = req.body.candidateStatus;

   candidateStatusService.patchUpdate({_id: candidateStautsData._id}, candidateStautsData);
}

module.exports.posUpdateAdditionalInfo = async(req,res,next) => {
   if(!res.body.udpatedOk)
      return
   const additionalInfoData = req.body;
   additionalInfoData._id = req.body.addiotnalInfo;
   additionalInfoService.patchUpdate({_id: additionalInfoData._id}, additionalInfoData);
}