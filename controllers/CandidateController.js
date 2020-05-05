const express = require('express');
const CandidateService = require('../services/CandidateService');

const router = express.Router();

router.get('/checkCandidate', async (req,res,next) => {
   const candidate = await CandidateService.getByRg(req.body.data);
   const candidateBool = candidate ? true:false;
   res.status(200).json({
      candidateBool
   });
   next();
});
router.post('/createCandidate', async(req,res,next) => {
   console.log("oi");
   try{
      const createdCandidate = await CandidateService.create(req.body.data);
      res.status(200).json({
         createdCandidate: true
      });
   }catch(error){
      console.log(error);
      res.status(400).json({
         createdCandidate: false
      });
   }
   next();
});


module.exports = router;