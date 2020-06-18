const xlsx = require("xlsx");

const additionalInfoService = require('../services/additionalInfoService');
const candidateStatusService = require('../services/candidateStatusService');
const CandidateService = require('../services/candidateService');


module.exports.SaveCandidatesList = async (req,res,next) => {
	var wb=xlsx.readFile(__dirname+'/input.xlsx',{cellDates:true});
   var ws=wb.sheets["sheet1"];
   var data=xlsx.utils.sheet_to_json(ws);
   data.foreach(function(p) {
    p.address= {
	"additionaladdress":p.additionaladdress,
	"street":p.street,
	"numberstreet":p.numberstreet,
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

//oq eu fiz
module.exports.preSaveAdditionalInfoList = async (req,res,next) => {
	console.log("additional list");
   req.data =  await req.data.map(async p=>{
      const additionalinfo =await additionalinfoservice.create(p);
      console.log(additionalinfo);
      p.additionalInfo=  additionalInfo._id	
   });
   console.log("Fim ADditional Info");
   next();
}  

module.exports.preSaveCandidateStatusList = async (req,res,next) => {
console.log("Candidate Status");
   req.data =  await req.data.map(async p=>{
      const candidateStatus =await candidateStatusService.create(p.candidateStatus);
      //console.log(additionalInfo);
      p.candidateStatus=  candidateStatus._id
	   });
   console.log("Fim Candidate Status");
   next();
}

module.exports.exportExcel = async (req,res,next) => {
   const candidate = await CandidateService.getAll();
   var newWB=xlsx.utils.book_new(); 
   var newWS=xlsx.utils.json_to_sheet(candidate);

   xlsx.utils.book_append_sheet(newWB,newWS,"OUTPUT");
   const pathXlsx = __dirname + "/../public/Output.xlsx";
   xlsx.writeFile(newWB,pathXlsx);
   await res.download(pathXlsx);
   res.status(200).send();
   //console.log(candidate);
   next();

}





