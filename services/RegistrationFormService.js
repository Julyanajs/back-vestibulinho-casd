const RegistrationFormModel = require('../models/RegistrationFormModel');

class RegistrationFormService {
   
   checkSort

   toObject(RegistrationFormModel){
      return RegistrationFormModel ? RegistrationFormModel.toObject() : null;
   }
   
   async create(RegistrationFormData){
      const RegistrationForm = new RegistrationFormModel(RegistrationFormData);
      return this.toObject(await RegistrationForm.save()) 
   }

   async getById(_id){
      return await RegistrationFormModel.findById(_id).lean();
   }

   async getByStudentRg(studentRg){
      return await RegistrationFormModel.findOne({studentRg}).lean();
   }

   async deleteById(_id){
      await RegistrationFormModel.deleteOne({_id});
   }
}

const RegistrationFormServiceInstance = new RegistrationFormService();
module.exports = RegistrationFormServiceInstance