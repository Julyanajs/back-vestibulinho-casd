const express = require('express');
const CandidateService = require('../services/candidateService');
const candidateMiddleware = require("../middleware/candidateMiddleware");
const sheetMiddleware = require("../middleware/sheetMiddleware");


const router = express.Router();

router.get('/checkCandidate', async (req,res,next) => {
   try {
      const candidate = await CandidateService.getByRg(req.query);
      if (candidate != null)
         res.status(201).json({candidate});
      else
         res.status(204).send();
   } catch {
      res.status(404).send({ error: "Error" });
   }
   next();
});

router.get('/getPage', async(req,res,next) => {
   const candidate = await CandidateService.getPage(req.query);
   res.status(200).json({
      candidate
   });
   next();
})

router.get('/getAll', async (req,res,next) => {
   const candidate = await CandidateService.getAll(req.query);
   res.status(200).json({
      candidate
   });
   next();
});


router.get('/exportCandidate/all', async (req,res,next) => {

	 next();
}, sheetMiddleware.exportExcel);


router.post('/createCandidateList',
	sheetMiddleware.SaveCandidatesList,
	sheetMiddleware.preSaveAdditionalInfoList,
	sheetMiddleware.preSaveCandidateStatusList,
   async(req,res,next) => {	   
	   req.data.forEach(async p => {		 
			try{
			const createdCandidate = await CandidateService.create(p);
			if (createdCandidate != null)
				res.status(200).send({createdCandidate});
			else
				res.status(403).send({ error: "Candidate already exists!" });
		}catch(error){
		   console.log(error);
			res.status(400).send();
      }
		})
      next();	  
   });


router.post('/createCandidate',
   candidateMiddleware.preSaveAdditionalInfo,
   candidateMiddleware.preSaveCandidateStatus,
   async(req,res,next) => {
      try{
         const createdCandidate = await CandidateService.create(req.body);
         if (createdCandidate != null){
            res.status(200).send({createdCandidate});
            res.locals.createdOk = true;
            console.log(res.locals);
         }
         else
            res.status(403).send({ error: "Candidate already exists!" });
      }catch(error){
         console.log(error);
         res.status(400).send();
      }
      next();
   },
   candidateMiddleware.deleteAdditionalInfoIfError,
   candidateMiddleware.deleteCandidateStatusIfError
);



router.put('/updateCandidate', async(req,res,next) => {
   try{
      const updatedCandidate = await CandidateService.updateByRg(req.body);
      if (updatedCandidate != null){
         res.locals.updatedOk = true;
         res.status(200).send({updatedCandidate});
         console.log(res.locals);
      }
      else
         res.status(404).send({ error: "Candidate doesn't exists!" });
   }catch(error){
      console.log(error);
      res.status(400).send();
   }
   next();
},
   candidateMiddleware.posUpdateAdditionalInfo,
   candidateMiddleware.posUpdateCandidateStauts
);


router.delete('/deleteCandidate', async(req,res,next) => {
   try{
      const deletedCandidate = await CandidateService.deleteByRg(req.query);
      if (updatedCandidate != null){
         res.locals.deletedOk = true;
         res.status(200).send({deletedCandidate});
      }
      else
         res.status(202).send({ error: "Candidate doesn't exists!" });
   }catch(error){
      console.log(error);
      res.status(404).send();
   }
   next();
});

router.delete('/deleteCandidate/all', async(req,res,next) => {
   try{
      const deletedCandidate = await CandidateService.deleteAll();
      res.status(200).send({deletedCandidate});
   }catch(error){
      console.log(error);
      res.status(404).send();
   }
   next();
});

module.exports = router;