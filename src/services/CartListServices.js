
const CartModel = require("../models/CartModel");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


const SaveCartListService = async (req) =>{
    try{
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        await CartModel.create(reqBody);
        return {status:"success",message:"Cart list create successful"};
    }
    catch(err){
        console.log(err);
        return {status:"fail", message:"Cart list create fail"};
    }
}



const UpdateCartListService = async (req) =>{
    try{
        let user_id = req.headers.user_id;
        let cartID = req.params.cartID;
    
        let reqBody = req.body;
        reqBody.userID = user_id;
        await CartModel.updateOne({_id:cartID,userID:user_id},{$set:reqBody});

        return {status:"success",message:"Cart list update successful"};
    }
    catch(err){
        console.log(err);
        return {status:"fail", message:"Cart list update fail"};
    }
}


const RemoveCartListService = async (req) =>{
    try{
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        await CartModel.deleteOne(reqBody);
        return {status:"success",message:"Remove successful"};
    }
    catch(err){
        return {status:"fail",message:err};
    }
}	


const CartListService = async (req) =>{
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
    
        let data = await CartModel.aggregate([
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
    CartListService,
    UpdateCartListService,
    RemoveCartListService,
    SaveCartListService
}