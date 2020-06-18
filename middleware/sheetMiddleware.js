const xlsx = require("xlsx");

const additionalInfoService = require('../services/additionalInfoService');
const candidateStatusService = require('../services/candidateStatusService');
const CandidateService = require('../services/candidateService');
const RoomService = require('../services/roomService');


module.exports.SaveCandidatesList = async (req,res,next) => {
	var wb=xlsx.readFile(__dirname+'/../public/input_candidates.xlsx',{cellDates:true});
   var ws=wb.Sheets["Sheet1"];
   var data=xlsx.utils.sheet_to_json(ws);
   console.log(data)
   data.forEach(function(p) {
      p.address= {
         "additionalAddress":p.additionalAddress,
         "street":p.street,
         "numberStreet":p.numberStreet,
         "neighborhood":p.neighborhood,
         "city":p.city,
         "state":p.state,
         "cep":p.cep
      };
      delete p.additionaladdress;
      delete p.street;
      delete p.numberstreet;
      delete p.neighborhood;
      delete p.city;
      delete p.state;
      delete p.cep;
      }
   );
      req.data=data;
	
   next();
}

module.exports.SaveRoomList = async (req,res,next) => {
	var wb=xlsx.readFile(__dirname+'/../public/input_room.xlsx',{cellDates:true});
   var ws=wb.Sheets["Sheet1"];
   var data=xlsx.utils.sheet_to_json(ws);
	req.data=data;
	console.log(data)
   next();
}

//oq eu fiz
module.exports.preSaveAdditionalInfoList = async (req,res,next) => {
   req.data =  await req.data.map(async p=>{
      const additionalinfo =await additionalinfoservice.create(p);
      p.additionalInfo=  additionalInfo._id	
   });
   next();
}  

module.exports.preSaveCandidateStatusList = async (req,res,next) => {
   req.data =  await req.data.map(async p=>{
      const candidateStatus =await candidateStatusService.create(p.candidateStatus);
      p.candidateStatus=  candidateStatus._id
	   });
   next();
}

module.exports.exportExcel = async (req,res,next) => {
   let candidate = await CandidateService.getAll();
   candidate = candidate.map(function(p) {
      p = {...p, ...p.additionalInfo};
      p = {...p, ...p.candidateStatus};
      delete p['additionalInfo'];
      delete p['candidateStatus'];
      return p;
   });
   console.log(candidate);
	
   var newWB=xlsx.utils.book_new(); 
   var newWS=xlsx.utils.json_to_sheet(candidate);
   xlsx.utils.book_append_sheet(newWB,newWS,"OUTPUT");
   const pathXlsx = __dirname + "/../public/Output_Candidates.xlsx";
   await xlsx.writeFile(newWB,pathXlsx);
   res.download(pathXlsx, (err) => {
      if(err)
         console.log(err);
      else
         next();
   })
}


module.exports.exportExcelRoom = async (req,res,next) => {
   const room = await RoomService.getAll();
   console.log(room);
   var newWB=xlsx.utils.book_new(); 
   var newWS=xlsx.utils.json_to_sheet(room);
  xlsx.utils.book_append_sheet(newWB,newWS,"OUTPUT");
   const pathXlsx = __dirname + "/../public/Output_room.xlsx";
   await xlsx.writeFile(newWB,pathXlsx);
   res.download(pathXlsx, (err) => {
      if(err)
         console.log(err);
      else
         next();
   })
}






