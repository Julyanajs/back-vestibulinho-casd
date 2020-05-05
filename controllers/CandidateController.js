const express = require('express');
const CandidateService = require('../services/CandidateService');

const router = express.Router();

router.get('/checkCandidate', async (req,res,next) => {
   console.log(req);
   const candidate = await CandidateService.getByRg(req.query);
   const candidateBool = candidate ? true:false;
   res.status(200).json({
      candidateBool
   });
   next();
});
router.post('/createCandidate', async(req,res,next) => {
   try{
      const createdCandidate = await CandidateService.create(req.body);
      res.status(200).send();
   }catch(error){
      console.log(error);
      res.status(400).send();
   }
   next();
});


module.exports = router;