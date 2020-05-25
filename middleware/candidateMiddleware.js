const additionalInfoService = require('../services/additionalInfoService');

module.exports.preSaveAdditionalInfo = async (req,res,next) => {
   const addiotnalInfo = await additionalInfoService.create(req.body.additionalInfo);
   console.log(addiotnalInfo);
   req.body.additionalInfo = addiotnalInfo._id;
   next();
}  

module.exports.preSaveCandidateStatus = async (req,res,next) => {
   
}