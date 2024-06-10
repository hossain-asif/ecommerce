const FeaturesModel = require('../models/FeaturesModel');
const LegalModel = require('../models/LegalModel');

const FeaturesService = async () =>{
    try{

        let data = await FeaturesModel.find();
        return {
            status:"success",
            data : data
        }

    }
    catch(err){
        return {
            status:"fail",
            data: err
        }.toString()
    }
}
const LegalDetailsService = async (req) =>{
    try{
        let type = req.params.type;
        let data = await LegalModel.find({type:type});
        return {
            status:"success",
            data : data
        }

    }
    catch(err){
        return {
            status:"fail",
            data: err
        }.toString()
    }
}


module.exports = {
    FeaturesService,
    LegalDetailsService
}