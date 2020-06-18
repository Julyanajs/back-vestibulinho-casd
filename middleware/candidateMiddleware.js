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
   console.log("DeleteAdditionalInfo");
   if(res.locals.createdOk){
      next();
   }else {
      console.log(req.body);
      await additionalInfoService.deleteById({_id:req.body.additionalInfo});
   }
   next();
}

module.exports.deleteCandidateStatusIfError = async(req,res,next) => {
   console.log("DeleteCandidateStatus");
   console.log(res.locals);
   if(res.locals.createdOk)
      next();
   else{
      console.log(res.locals);
      await candidateStatusService.deleteById({_id: req.body.candidateStatus});
   }
      next();
}

module.exports.posUpdateCandidateStauts = async(req, res, next) => {
   console.log(res.locals.udpatedOk);
   if(!res.locals.udpatedOk)
      next();
   else{
      const candidateStautsData = req.body;
      candidateStatusData._id = req.body.candidateStatus;
      candidateStatusService.patchUpdate({_id: candidateStautsData._id}, candidateStautsData);
      next();
   }
}

module.exports.posUpdateAdditionalInfo = async(req,res,next) => {
   console.log(res.locals.udpatedOk);
   if(!res.locals.udpatedOk)
      next();
   else{
      const additionalInfoData = req.body;
      additionalInfoData._id = req.body.addiotnalInfo;
      additionalInfoService.patchUpdate({_id: additionalInfoData._id}, additionalInfoData);
      next();
   }
}