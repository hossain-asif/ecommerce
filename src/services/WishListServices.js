
const WishModel = require("../models/WishModel");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


const SaveWishListService = async (req) =>{
    try{
        let user_id = req.headers.user_id;
      
        let reqBody = req.body;
        reqBody.userID = user_id;
        await WishModel.updateOne(reqBody,{$set:reqBody},{upsert:true});

        return {status:"success",message:"wish list update/create successful"};
    }
    catch(err){
        console.log(err);
        return {status:"fail", message:"wish list update/create fail"};
    }
}


const RemoveWishListService = async (req) =>{
    try{
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        await WishModel.deleteOne(reqBody);
        return {status:"success",message:"Remove successful"};
    }
    catch(err){
        return {status:"fail",message:err};
    }
}	


const WishListService = async (req) =>{
    try{

        let user_id = new ObjectId(req.headers.user_id);
        let matchStage = {$match:{userID:user_id}};


        let joinWithProductStage = {$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}};
        let unwindProductStage = {$unwind:"$product"};

        let joinWithBrandStage = {$lookup:{from:"brands",localField:"product.brandID",foreignField:"_id",as:"brand"}};
        let unwindBrandStage = {$unwind:"$brand"};

        let joinWithCategoryStage = {$lookup:{from:"categories",localField:"product.categoryID",foreignField:"_id",as:"category"}};
        let unwindCategoryStage = {$unwind:"$category"};

        let projectionStage = {$project:{'_id':0,'userID':0,'createdAt':0,'updatedAt':0,'product._id':0,'product.categoryID':0,'product.brandID':0,'brand._id':0,'category._id':0}}
    
        let data = await WishModel.aggregate([
            matchStage,
            joinWithProductStage,
            unwindProductStage,
            joinWithBrandStage,
            unwindBrandStage,
            joinWithCategoryStage,
            unwindCategoryStage,
            projectionStage
        ]);


        return {status:"success", data:data};

    }
    catch(err){
        return {status:"fail",message:"sorry"};
    }
}

module.exports = {
    WishListService,
    RemoveWishListService,
    SaveWishListService
}