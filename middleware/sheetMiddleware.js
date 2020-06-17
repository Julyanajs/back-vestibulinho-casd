var xlsx=require("xlsx");

const additionalInfoService = require('../services/additionalInfoService');
const candidateStatusService = require('../services/candidateStatusService');
const CandidateService = require('../services/candidateService');


module.exports.SaveCandidatesList = async (req,res,next) => {
	var wb=xlsx.readFile(__dirname+'/input.xlsx',{cellDates:true});
   var ws=wb.Sheets["Sheet1"];
   var data=xlsx.utils.sheet_to_json(ws);
   data.forEach(function(p) {
    p.address= {
	"additionalAddress":p.additionalAddress,
	"street":p.street,
	"numberStreet":p.numberStreet,
	"neighborhood":p.neighborhood,
	"city":p.city,
	"state":p.state,
	"cep":p.cep};
	delete p.additionalAddress;
	delete p.street;
	delete p.numberStreet;
	delete p.neighborhood;
	delete p.city;
	delete p.state;
	delete p.cep;
   });
	req.data=data;
   next();
}



//OQ EU FIZ
module.exports.preSaveAdditionalInfoList = async (req,res,next) => {
	console.log("Additional List");
req.data =  await req.data.map(async p=>{
		   	     const additionalInfo =await additionalInfoService.create(p);
				console.log(additionalInfo);
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
	   
	   
	   

//console.log(req.data);

   next();
}


//module.exports.preSaveAdditionalInfoList = async (req,res,next) => {
	//   req.data.forEach(async p => {		 
		
		//	  const addiotnalInfo = await additionalInfoService.create(p);
			//  console.log(addiotnalInfo);
			//p.additionalInfo = addiotnalInfo._id;
		
//		})
  // next();
//}  

//module.exports.preSaveCandidateStatusList = async (req,res,next) => {
  //	   req.data.forEach(async p => {		 
	//		try{
		//	     const candidateStatus = await candidateStatusService.create(p.candidateStatus);
			//	p.candidateStatus = candidateStatus._id;
		//}catch(error){
     // }
		//})
   //next();
//}

  



module.exports.exportExcel = async (req,res,next) => {
const candidate = await CandidateService.getAll();
var newWB=xlsx.utils.book_new(); 
var newWS=xlsx.utils.json_to_sheet(candidate);
xlsx.utils.book_append_sheet(newWB,newWS,"OUTPUT");
xlsx.writeFile(newWB,__dirname+"/Output.xlsx");
//console.log(candidate);
next();

}





