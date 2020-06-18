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
	"cep":p.cep};
	delete p.additionaladdress;
	delete p.street;
	delete p.numberstreet;
	delete p.neighborhood;
	delete p.city;
	delete p.state;
	delete p.cep;
   });
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
   const candidate = await CandidateService.getAll();
   console.log(candidate)
   console.log(candidate[0].additionalInfo.street)
   candidate.forEach(function(p) {
	p.gender=p.additionalInfo.gender;
	p.school=p.additionalInfo.school;
	p.kindSchool=p.additionalInfo.kindSchool;
	p.ifSpecialNecessity=p.additionalInfo.ifSpecialNecessity;
	p.phone1=p.additionalInfo.phone1;
	p.kinship=p.additionalInfo.kinship;
	p.relativeName=p.additionalInfo.relativeName;
	p.schooling=p.additionalInfo.schooling;
	p.wayPS=p.additionalInfo.wayPS;
	p.birthDate=p.additionalInfo.birthDate;
	p.additionalAddress=p.additionalInfo.address.additionalAddress;
	p.street=p.additionalInfo.address.street;
	p.numberStreet=p.additionalInfo.address.numberStreet;
	p.neighborhood=p.additionalInfo.address.neighborhood;
	p.city=p.additionalInfo.address.city;
   p.state=p.additionalInfo.address.state;
   p.cep=p.additionalInfo.address.cep;
   
   });

	
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






