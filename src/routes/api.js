const express = require('express');
const ProductController = require('../controllers/ProductController');
const UserController = require('../controllers/UserController');
const WishListController = require('../controllers/WishListController');
const CartListController = require('../controllers/CartListController');
const InvoiceController = require('../controllers/InvoiceController');
const FeaturesController = require('../controllers/FeaturesController');
const AuthVerification= require('../middlewares/AuthVerification');

const router = express.Router();


//Product
router.get('/ProductBrandList', ProductController.ProductBrandList);
router.get('/ProductCategoryList', ProductController.ProductCategoryList);
router.get('/ProductSliderList', ProductController.ProductSliderList);

router.get('/ProductListByBrand/:BrandID', ProductController.ProductListByBrand);
router.get('/ProductListByCategory/:CategoryID', ProductController.ProductListByCategory);
router.get('/ProductListByRemark/:Remark', ProductController.ProductListByRemark);

router.get('/ProductListBySimilar/:CategoryID', ProductController.ProductListBySimilar);
router.get('/ProductDetails/:ProductID', ProductController.ProductDetails);

router.get('/ProductListByKeyword/:Keyword', ProductController.ProductListByKeyword);
router.get('/ProductReviewList/:ProductID', ProductController.ProductReviewList);

router.post('/ProductListByFilter', ProductController.ProductListByFilter);




//user

router.get('/UserOTP/:email', UserController.UserOTP);
router.get('/VerifyLogin/:email/:otp', UserController.VerifyLogin);
router.get('/UserLogout',AuthVerification,UserController.UserLogout);

router.get('/ReadProfile',AuthVerification,UserController.ReadProfile);
router.post('/CreateProfile',AuthVerification,UserController.CreateProfile);
router.post('/UpdateProfile',AuthVerification,UserController.UpdateProfile);


//wishList
router.post('/CreateWishList',AuthVerification, WishListController.CreateWishList);
router.post('/RemoveWishList',AuthVerification, WishListController.RemoveWishList);
router.get('/WishList',AuthVerification,WishListController.WishList);

//cartList
router.post('/SaveCartList',AuthVerification, CartListController.SaveCartList);
router.post('/UpdateCartList/:cartID',AuthVerification, CartListController.UpdateCartList);
router.post('/RemoveCartList',AuthVerification, CartListController.RemoveCartList);
router.get('/CartList',AuthVerification,CartListController.CartList);



//Invoice & Payment

router.get('/CreateInvoice',AuthVerification,InvoiceController.CreateInvoice);
router.get('/InvoiceList',AuthVerification,InvoiceController.InvoiceList);
router.get('/InvoiceProductList/:invoice_id',AuthVerification,InvoiceController.InvoiceProductList);

router.post('/PaymentSuccess/:trxID',AuthVerification, InvoiceController.PaymentSuccess);
router.post('/PaymentCancel/:trxID',AuthVerification, InvoiceController.PaymentCancel);
router.post('/PaymentFail/:trxID',AuthVerification, InvoiceController.PaymentFail);
router.post('/PaymentIPN/:trxID',AuthVerification, InvoiceController.PaymentIPN);


//features
router.get('/FeaturesList',FeaturesController.FeaturesList);
router.get('/LegalDetails/:type',FeaturesController.LegalDetails);

//review
router.post('/CreateReview',AuthVerification,ProductController.CreateReview);



module.exports = router;