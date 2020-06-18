const express = require('express');
const candidateService = require('../services/candidateService');
const candidateMiddleware = require("../middleware/candidateMiddleware");
const sheetMiddleware = require("../middleware/sheetMiddleware");
const candidateStatusService = require('../services/candidateStatusService');
const additionalInfoService = require('../services/additionalInfoService');
const router = express.Router();

router.get('/checkCandidate', async (req,res,next) => {
   try {
      const candidate = await candidateService.getByRg(req.query);
      if (candidate != null)
         res.status(201).json({candidate});
      else
         res.status(204).send();
   } catch {
      res.status(404).send({ error: "Error" });
   }
   next();
});

router.get('/checkCandidateId', async(req,res,next) => {
   try{
      const candidate = await candidateService.getById(req.query);
      if(candidate != null)
         res.status(201).json({candidate});
      else
         res.status(204).send();
   }catch{
      res.status(404).send({error: "Error"});
   }
   next();
});

router.get('/getPage', async(req,res,next) => {
   const candidate = await candidateService.getPage(req.query);
   res.status(200).json({
      candidate
   });
   next();
})

router.get('/getAll', async (req,res,next) => {
   const candidate = await candidateService.getAll(req.query);
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
   async(req,res,next) => {	   
	   req.data.forEach(async p => {		 
			try{

			const addiotnalInfo = await additionalInfoService.create(p);
			 p.additionalInfo = addiotnalInfo._id;
			 const candidateStatus = await candidateStatusService.create(p);
			p.candidateStatus = candidateStatus._id;
			const createdCandidate = await candidateService.create(p);
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
         const createdCandidate = await candidateService.create(req.body);
         if (createdCandidate != null){
            res.status(200).send({createdCandidate});
            res.locals.createdOk = true;
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
      const updatedCandidate = await candidateService.updateByRg(req.body);
      if (updatedCandidate != null){
         res.locals.updatedOk = true;
         res.locals.additionalInfoId = updatedCandidate.additionalInfo;
         res.locals.candidateStatusId = updatedCandidate.candidateStatus;
         res.status(200).send({updatedCandidate});
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
      const deletedCandidate = await candidateService.deleteByRg(req.query);
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
      const deletedCandidate = await candidateService.deleteAll();
      res.status(200).send({deletedCandidate});
   }catch(error){
      console.log(error);
      res.status(404).send();
   }
   next();
});

module.exports = router;