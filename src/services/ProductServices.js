

const BrandModel = require('../models/BrandModel');
const CategoryModel = require('../models/CategoryModel');
const ProductSliderModel = require('../models/ProductSliderModel');
const ProductModel = require('../models/ProductModel');
const ProductDetailModel = require('../models/ProductDetailModel');
const ReviewModel = require('../models/ReviewModel');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;



const BrandListService = async () =>{
    try{

        let data = await BrandModel.find();
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

const CategoryListService = async () =>{
    try{

        let data = await CategoryModel.find();
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

const SliderListService = async () =>{
    try{

        let data = await ProductSliderModel.find();
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





const ListByBrandService = async (req) =>{
    try{
        let BrandID = new ObjectId(req.params.BrandID);
        let matchStage = {$match:{brandID:BrandID}};
        let joinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let joinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let unwindBrandStage = {$unwind:"$brand"};
        let unwindCategoryStage = {$unwind:"$category"};
        let projectionStage = {$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}};
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage
        ]);
        return {status:"success",data:data};
    }
    catch(err){
        return {status:"fail",data:err}.toString();
    }
}

const ListByCategoryService = async (req) =>{
    try{
        let CategoryID = new ObjectId(req.params.CategoryID);
        let matchStage = {$match:{categoryID:CategoryID}};
        let joinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let joinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let unwindBrandStage = {$unwind:"$brand"};
        let unwindCategoryStage = {$unwind:"$category"};
        let projectionStage = {$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}};
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage
        ]);
        return {status:"success",data:data};
    }
    catch(err){
        return {status:"fail",data:err}.toString();
    }
}

const ListByRemarkService = async (req) =>{
    try{
        let Remark = req.params.Remark;
        let matchStage = {$match:{remark:Remark}};
        let joinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let joinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let unwindBrandStage = {$unwind:"$brand"};
        let unwindCategoryStage = {$unwind:"$category"};
        let projectionStage = {$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}};
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage
        ]);
        return {status:"success",data:data};
    }
    catch(err){
        return {status:"fail",data:err}.toString();
    }
}







const ListBySimilarService = async (req) =>{
    try{
        let CategoryID = new ObjectId(req.params.CategoryID);
        let matchStage = {$match:{categoryID:CategoryID}};
        let limitStage = {$limit:20};
        let joinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let joinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let unwindBrandStage = {$unwind:"$brand"};
        let unwindCategoryStage = {$unwind:"$category"};
        let projectionStage = {$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}};
        let data = await ProductModel.aggregate([
            matchStage,
            limitStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage
        ]);
        return {status:"success",data:data};
    }
    catch(err){
        return {status:"fail",data:err}.toString();
    }
}

const DetailsService = async (req) =>{
    try{
        
        let ProductID = new ObjectId(req.params.ProductID);
        console.log("asif");
        let matchStage = {$match:{_id:ProductID}};
        let joinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let joinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let joinWithDetailsStage = {$lookup:{from:"productdetails",localField:"_id",foreignField:"productID",as:"details"}};

        let unwindBrandStage = {$unwind:"$brand"};
        let unwindCategoryStage = {$unwind:"$category"};
        let unwindDetailsStage = {$unwind:"$details"};

        let projectionStage = {$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}};

        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            joinWithDetailsStage,
            unwindBrandStage,
            unwindCategoryStage,
            unwindDetailsStage,
            projectionStage
        ]);
        return {status:"success",data:data};
    }
    catch(err){
        return {status:"fail",data:err}.toString();
    }
}







const ListByKeywordService = async (req) =>{
    try{
        let searchRegex = {"$regex":req.params.Keyword,"$options":"i"};
        let searchParams = [{title:searchRegex},{shortDes:searchRegex}];
        let searchQuery = {$or:searchParams};
        let matchStage = {$match:searchQuery};
        let joinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let joinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};

        let unwindBrandStage = {$unwind:"$brand"};
        let unwindCategoryStage = {$unwind:"$category"};

        let projectionStage = {$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}};

        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage
        ]);
        return {status:"success",data:data};
    }
    catch(err){
        return {status:"fail",data:err}.toString();
    }
}











const ReviewListService = async (req)=>{
    try{
        let ProductID = new ObjectId(req.params.ProductID);
        let matchStage = {$match:{productID:ProductID}};
        let joinWithProfileStage = {
            $lookup:{
                from:"profiles",
                localField:"userID",
                foreignField:"userID",
                as:"profile"
            }
        }
        
        let unwindProfileStage = {$unwind:"$profile"};
        let projectionStage = {
            $project:{
                'des':1,
                'rating':1,
                'profile.cus_name':1
            }
        }

        let data = await ReviewModel.aggregate([
            matchStage,
            joinWithProfileStage,
            unwindProfileStage,
            projectionStage
        ])
        
        return {status:"success",data:data};
    }
    catch(err){
        return {status:"fail",data:err}.toString();
    }
}


const CreateReviewService = async (req)=>{
    try{
        let user_id = req.headers.user_id;
        let reqBody = req.body;

        console.log(reqBody);

        let data = await ReviewModel.create({
            productID: reqBody['productID'],
            userID: user_id,
            des: reqBody['des'],
            rating: reqBody['rating']
        });

        

        
        return {status:"success", data:data};
    }
    catch(err){
        return {status:"fail",data:err}.toString();
    }
}

const ListByFilterService = async (req) => {

    try {

        let matchConditions = {};
        if (req.body['categoryID']) {
            matchConditions.categoryID = new ObjectId(req.body['categoryID']);
        }
        if (req.body['brandID']) {
            matchConditions.brandID = new ObjectId(req.body['brandID']);
        }
        let MatchStage = { $match: matchConditions };





        let AddFieldsStage = {
            $addFields: { numericPrice: { $toInt: "$price" }}
        };
        let priceMin = parseInt(req.body['priceMin']);
        let priceMax = parseInt(req.body['priceMax']);
        let PriceMatchConditions = {};
        if (!isNaN(priceMin)) {
            PriceMatchConditions['numericPrice'] = { $gte: priceMin };
        }
        if (!isNaN(priceMax)) {
            PriceMatchConditions['numericPrice'] = { ...(PriceMatchConditions['numericPrice'] || {}), $lte: priceMax };
        }
        let PriceMatchStage = { $match: PriceMatchConditions };






        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data= await  ProductModel.aggregate([
            MatchStage,
            AddFieldsStage,
            PriceMatchStage,
            JoinWithBrandStage,JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage, ProjectionStage
        ])
        return {status:"success",data:data}

    }catch (e) {
        return {status:"fail",data:e}.toString()
    }
    
}



module.exports = {
    BrandListService,
    CategoryListService, 
    SliderListService,
    ListByBrandService,
    ListByCategoryService,
    ListByKeywordService,
    ListByRemarkService,
    ListBySimilarService,
    DetailsService,
    CreateReviewService,
    ReviewListService,
    ListByFilterService
}