const additionalInfoService = require('../services/additionalInfoService');
const candidateStatusService = require('../services/candidateStatusService');

module.exports.preSaveAdditionalInfo = async (req,res,next) => {
   let additionalInfoData = {};
   if(req.body.hasOwnProperty('additionalInfo'))
      additionalInfoData = req.body.additionalInfo;
   else
      additionalInfoData = req.body;
   const addiotnalInfo = await additionalInfoService.create(additionalInfoData);
   console.log(addiotnalInfo);
   req.body.additionalInfo = addiotnalInfo._id;
   next();
}  

module.exports.preSaveCandidateStatus = async (req,res,next) => {
   let candidateStatusData = {};
   if(req.body.hasOwnProperty('candidateStatus'))
      candidateStatusData = req.body.candidateStatus;
   else
      candidateStatusData = req.body;
   const candidateStatus = await candidateStatusService.create(candidateStatusData);
   console.log(candidateStatus);
   req.body.candidateStatus = candidateStatus._id;
   next();
}

module.exports.deleteAdditionalInfoIfError = async (req,res,next) => {
   if(res.locals.createdOk){
      next();
   }else {
      await additionalInfoService.deleteById({_id:req.body.additionalInfo});
   }
   next();
}

module.exports.deleteCandidateStatusIfError = async(req,res,next) => {
   if(res.locals.createdOk)
      next();
   else{
      await candidateStatusService.deleteById({_id: req.body.candidateStatus});
   }
      next();
}

module.exports.posUpdateCandidateStauts = async(req, res, next) => {
   if(!res.locals.updatedOk)
      next();
   else{
      const candidateStatusData = req.body.candidateStatus ? req.body.candidateStatus:req.body;
      candidateStatusData._id = res.locals.candidateStatusId;
      candidateStatusService.updateById(candidateStatusData);
      next();
   }
}

module.exports.posUpdateAdditionalInfo = async(req,res,next) => {
   if(!res.locals.updatedOk)
      next();
   else{
      const additionalInfoData = req.body.additionalInfo ? req.body.additionalInfo:req.body;
      additionalInfoData._id = res.locals.additionalInfoId;
      additionalInfoService.updateById(additionalInfoData);
      next();
   }
}