const express = require('express');
const RoomService = require('../services/RoomService');
const sheetMiddleware = require("../middleware/sheetMiddleware");



const router = express.Router();

router.post('/createRoomList',
	sheetMiddleware.SaveRoomList,
   async(req,res,next) => {	   
	   req.data.forEach(async p => {		 
			try{
			const createdRoom = await RoomService.create(p);
			if (createdRoom != null)
				res.status(200).send({createdRoom});
			else
				res.status(403).send({ error: "Room already exists!" });
		}catch(error){
		   console.log(error);
			res.status(400).send();
      }
		})
      next();	  
   });

router.get('/exportRoom/all', async (req,res,next) => {

	 next();
}, sheetMiddleware.exportExcelRoom);


router.post('/createRoom',
  async(req,res,next) => {
      try{
         const createdRoom = await RoomService.create(req.body);
         if (createdRoom != null){
            res.status(200).send({createdRoom});
            res.locals.createdOk = true;
            console.log(res.locals);
         }
         else
            res.status(403).send({ error: "room already exists!" });
      }catch(error){
         console.log(error);
         res.status(400).send();
      }
      next();
   },
   );

router.get('/checkRoom', async (req,res,next) => {
   try {
	   console.log(req.query)
      const room = await RoomService.getByName(req.query);
      if (room != null)
         res.status(201).json({room});
      else
         res.status(204).send();
   } catch {
      res.status(404).send({ error: "Error" });
   }
   next();
});


router.put('/updateRoom', async(req,res,next) => {
   try{
	   console.log(req.body);
      const updatedRoom = await RoomService.updateByName(req.body);
      if (updatedRoom != null){
         res.locals.updatedOk = true;
         res.status(200).send({updatedRoom});
         console.log(res.locals);
      }
      else
         res.status(404).send({ error: "Room doesn't exists!" });
   }catch(error){
      console.log(error);
      res.status(400).send();
   }
   next();
},
);


router.delete('/deleteRoom', async(req,res,next) => {
   try{
      const deletedRoom = await RoomService.deleteByName(req.query);
      if (updatedRoom != null){
         res.locals.deletedOk = true;
         res.status(200).send({deletedRoom});
      }
      else
         res.status(202).send({ error: "Delete doesn't exists!" });
   }catch(error){
      console.log(error);
      res.status(404).send();
   }
   next();
});



module.exports = router;