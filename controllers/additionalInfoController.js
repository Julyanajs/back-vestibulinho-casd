const express = require('express');
const additionalInfoService = require('../services/additionalInfoService');

const router = express.Router();

router.get('/checkadditionalInfo', async (req,res,next) => {
   const additionalInfo = await additionalInfoService.getBycep(req.query);
   const additionalInfoBool = additionalInfo ? true:false;
   res.status(200).json({
      additionalInfoBool
   });
   next();
});
router.post('/createadditionalInfo', async(req,res,next) => {
   try{
      const createdadditionalInfo = await additionalInfoService.create(req.body);
      res.status(200).send();
   }catch(error){
      console.log(error);
      res.status(400).send();
   }
   next();
});


module.exports = router;


