const additionalInfoService = require('../services/additionalInfoService');

module.exports.preSave = async (req,res,next) => {
   const addiotnalInfo = await additionalInfoService.create(req.body.additionalInfo);
   console.log(addiotnalInfo);
   req.body.additionalInfo = addiotnalInfo._id;
   next();
}  