const mongoose = require("mongoose");
const CartModel = require("../models/CartModel");
const ProfileModel = require("../models/ProfileModel");
const InvoiceModel = require("../models/InvoiceModel");
const InvoiceProductModel = require("../models/InvoiceProductModel");
const PaymentSettingsModel = require("../models/PaymentSettingModel");
const FormData = require("form-data");
const axios = require("axios");				
const ObjectId = mongoose.Types.ObjectId;



const CreateInvoiceService = async (req) =>{
	let user_id =new ObjectId(req.headers.user_id);
	let cus_email = req.headers.email;

    try{


        //step 1:calculate Total Payable & vat

		let matchStage = {$match:{userID:user_id}};	
	    let joinWithProductStage = {$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}};
		let unwindProductStage = {$unwind:"$product"};
		let cartProduct = await CartModel.aggregate([matchStage,joinWithProductStage,unwindProductStage]);


        let totalAmount = 0;
        cartProduct.forEach((element)=>{
            let price;
            if(element['product']['discount']){
                price = parseFloat(element['product']['discountPrice'])
            }
            else{
                price = parseFloat(element['product']['price'])
            }
            totalAmount += parseFloat(element['qty'])*price;
        })

        let vat = totalAmount * 0.05;
        let payable = totalAmount + vat;

        //step 2: Prepare Customer Details & shipping Details

        let profile = await ProfileModel.aggregate([matchStage]);
		let cus_details = `Name:${profile[0]['cus_name']},email:${cus_email},Address:${profile[0]['cus_add']},Phone:${profile[0]['cus_phone']}`;
		let shipping_details = `Name:${profile[0]['ship_name']}, City:${profile[0]['ship_city']}, Address:${profile[0]['ship_add']}, Phone:${profile[0]['ship_phone']}`;

        //step 3: Transaction & other's ID
        let tran_id = Math.floor(10000000 + Math.random()*90000000);
		let val_id = 0;
		let delivery_status = "pending";
		let payment_status = "pending";

        //step 4: Create Invoice
        let createInvoice = await InvoiceModel.create({
			userID: user_id,
			payable: payable,
			cus_details: cus_details,
			ship_details: shipping_details,
			tran_id: tran_id,
			val_id: val_id,
			payment_status: payment_status,
			delivery_status: delivery_status,
			total: totalAmount,
			vat: vat 
		});


        //step 5: Create Invoice Product model
		let invoice_id = createInvoice['_id'];
		cartProduct.forEach(async (element)=>{
			await InvoiceProductModel.create({
				userID: user_id,
				productID: element['productID'],
				invoiceID: invoice_id,
				qty: element['qty'],
				price:element['product']['discount']?element['product']['discountPrice']:element['product']['price'],
				color: element['color'],
				size: element['size'],
			})
		})

        //step 6: Remove cart
        await CartModel.deleteMany({userID : user_id});

        // step 7: prepare SSL payment
        let PaymentSettings = await PaymentSettingsModel.find();


        const form = new FormData();

        // console.log(cus_email);

        form.append('store_id',PaymentSettings[0]['store_id']);
        form.append('store_passwd',PaymentSettings[0]['store_passwd']);
        form.append('total_amount',payable.toString());
        form.append('currency',PaymentSettings[0]['currency']);
        form.append('tran_id',tran_id);
        form.append('success_url',`${PaymentSettings[0]['success_url']}/${tran_id}`);
        form.append('fail_url',`${PaymentSettings[0]['fail_url']}/${tran_id}`);
        form.append('cancel_url',`${PaymentSettings[0]['cancel_url']}/${tran_id}`);
        form.append('ipn_url',`${PaymentSettings[0]['ipn_url']}/${tran_id}`);

        
        form.append('cus_name',profile[0]['cus_name']);
        form.append('cus_email',cus_email);
        form.append('cus_add1',profile[0]['cus_add']);
        form.append('cus_add2',profile[0]['cus_add']);
        form.append('cus_city',profile[0]['cus_city']);
        form.append('cus_state',profile[0]['cus_state']);
        form.append('cus_postcode',profile[0]['cus_postcode']);
        form.append('cus_country',profile[0]['cus_country']);
        form.append('cus_phone',profile[0]['cus_phone']);
        form.append('cus_fax',profile[0]['cus_fax']);


        form.append('shipping_method',"YES");

        form.append('ship_name',profile[0]['ship_name']);
        form.append('ship_add1',profile[0]['ship_add']);
        form.append('ship_add2',profile[0]['ship_add']);
        form.append('ship_city',profile[0]['ship_city']);
        form.append('ship_state',profile[0]['ship_state']);
        form.append('ship_postcode',profile[0]['ship_postcode']);
        form.append('ship_country',profile[0]['ship_country']);

        form.append('product_name','According Invoice');
        form.append('product_category','According Invoice');
        form.append('product_profile','According Invoice');
        form.append('product_amount','According Invoice');


        let SSLRes = await axios.post(PaymentSettings[0]['init_url'],form);

        return {status:"success", data:SSLRes.data};

    }
    catch(err){
        console.log(err);
        return {status:"fail", message:"create invoice fail"};

    }


}


const PaymentSuccessService = async (req) =>{
    try{
        let trxID = req.params.trxID;
        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"success"});
        return {status:"success1"};
    }
    catch(err){
        console.log(err);
        return {status:"fail", message:"something went wrong"};
    }
    
}
const PaymentFailService = async (req) =>{
    try{
        let trxID = req.params.trxID;
        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"fail"});
        return {status:"success"};
    }
    catch(err){
        console.log(err);
        return {status:"fail", message:"something went wrong"};
    }

}
const PaymentCancelService = async (req) =>{
    try{
        let trxID = req.params.trxID;
        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"cancel"});
        return {status:"success"};
    }
    catch(err){
        console.log(err);
        return {status:"fail", message:"something went wrong"};
    }

}
const PaymentIPNService = async (req) =>{
    try{
        let trxID = req.params.trxID;
        let status = req.body['status'];
        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:status});
        return {status:"success"};
    }
    catch(err){
        console.log(err);
        return {status:"fail", message:"something went wrong"};
    }

}
const InvoiceListService = async (req) =>{
    try{
        let user_id = req.headers.user_id;
        let invoice = await InvoiceModel.find({userID:user_id});

        return {status:"success",data:invoice};
    }
    catch(err){
        console.log(err);
        return {status:"fail", message:"something went wrong"};
    }

}
const InvoiceProductListService = async (req) =>{


    try{
        let user_id =new ObjectId(req.headers.user_id);
        let invoice_id =new ObjectId(req.params.invoice_id);

		let matchStage = {$match:{userID:user_id,invoiceID:invoice_id}};	
	    let joinWithProductStage = {$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}};
		let unwindProductStage = {$unwind:"$product"};
		let products = await InvoiceProductModel.aggregate([matchStage,joinWithProductStage,unwindProductStage]);
        // console.log(products);
        return {status:"success",data:products};
        
    }
    catch(err){
        console.log(err);
        return {status:"fail", message:"something went wrong"};
    }
}






module.exports = {
    CreateInvoiceService,
    PaymentSuccessService,
    PaymentFailService,
    PaymentCancelService,
    PaymentIPNService,
    InvoiceListService,
    InvoiceProductListService
}