const EmailSend = require("../utility/EmailHelper");
let {EncodeToken,DecodeToken} = require("../utility/TokenHelper");
const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");


const UserOTPService = async (req)=>{
	try{
		let email = req.params.email;
        
		let code = Math.floor(100000 + Math.random()*900000);
		let EmailText = `Your verification code is = ${code}`;
		let EmailSubject = 'Email Verification';
		await EmailSend(email,EmailText,EmailSubject);

		await UserModel.updateOne({email:email},{$set:{otp:code}},{upsert:true});
		return {status:"success",message:"6 digit OTP has been sent"};
	}
	catch(err){
		return {status:"fail",message:"Something went wrong"};
	}
}

const VerifyOTPService = async (req)=>{
	try{
		let email = req.params.email;
		let otp = req.params.otp;

		let total = await UserModel.find({email:email,otp:otp}).count('total');
        

		if(total === 1){
			let user_id = await UserModel.find({email:email,otp:otp}).select('_id');
            
			let token = EncodeToken(email,user_id[0]['_id'].toString());
            
			await UserModel.updateOne({email:email},{$set:{otp:"0"}});

			return {status:"success",message:"Valid OTP",token:token};
		}
		else{
			return {status:"fail",message:"Invalid OTP"};
		}
	}
	catch(err){
		return {status:"fail",message:"Invalid OTP"};
	}
}

const SaveProfileService = async (req) =>{
	try{
		let user_id = (req.headers.user_id);
		let reqBody = req.body;
		reqBody.userID =user_id;
		await ProfileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true});
		return {status:"success",message:"Profile Save Success"};
	}
	catch(err){
		return {status:"fail",message:"profile save fail"};
	}
}

const ReadProfileService = async (req) =>{
    try{
		let user_id = req.headers.user_id;
		let result = await ProfileModel.find({userID:user_id});
		return {status:"success", data:result};
	}
	catch(err){
		return {status:"fail",message:err};
	}
}


module.exports = {
    UserOTPService,
    VerifyOTPService,
    SaveProfileService,
    ReadProfileService
}