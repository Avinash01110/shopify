// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "@/models/product";
import connectDb from "../../middleware/mongoose";
import Order from "../../models/order";
import pincodes from "../../pincodes.json"
// const https = require("https");
/*
 * import checksum generation utility
 * You can get this utility from https://developer.paytm.com/docs/checksum/
 */
// const PaytmChecksum = require('paytmchecksum');

const handler = async (req, res) => {
  if (req.method == "POST") {
    // Checking if the cart is tampered.

    if(req.body.subTotal <= 0){
      res.status(200).json({ error: true, "error":"Your cart is empty" });
        return
    }
    if(req.body.phone.length !== 10 || isNaN(req.body.phone) ){
      res.status(200).json({ error:true ,"error":"Phone number is not correct"});
      return
    }
    if(req.body.pincode.length !== 6 || isNaN(req.body.pincode) ){
      res.status(200).json({ error:true ,"error":"Pincode is not correct"});
      return
    }
    if(!Object.keys(pincodes).includes(req.body.pincode)){
      res.status(200).json({ error:true ,"error":"Pincode is not serviceable"});
      return
    }

    let cart = req.body.Cart;
    let product,sumtotal = 0;
    
    for (let item in cart) {
      sumtotal += cart[item].price * cart[item].qty;
      product = await Product.findOne({ slug: item });
      if (product.price != cart[item].price) {
        res.status(200).json({ error: true,cart_error:true, "error":"Some issue has occured with the cart" });
        return
      }
      if (product.availableqty < cart[item].qty) {
        res.status(200).json({ error: true,cart_error:true, "error":"Some items in your cart are out of stock" });
        return
      }
    }
    if(sumtotal != req.body.subTotal){
      res.status(200).json({ error:true ,cart_error:true,"error":"Some issue has occured with the cart"});
      return
    }



    let order = new Order({
      name: req.body.name,
      email: req.body.email,
      orderId: req.body.orderId,
      products: req.body.Cart,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      pincode: req.body.pincode,
      phone: req.body.phone,
      amount: req.body.subTotal,
      status: req.body.status,
      paymentInfo: JSON.stringify(req.body),
    });
    await order.save();


    let orders = await Order.findOne({orderId:(req.body.orderId)})
    let products = orders.products
    for(let slug in products){
      console.log(slug)
      await Product.findOneAndUpdate({slug:slug},{$inc:{'availableqty': -products[slug].qty}})
    } 


    res.status(200).json({success:true, order_id: order._id });
    // res.redirect("/order?id="+order._id,200)

    // var paytmParams = {};

    // paytmParams.body = {
    //   requestType: "Payment",
    //   mid: process.env.NEXT_PUBLIC_PAYTM_MID,
    //   websiteName: "YOUR_WEBSITE_NAME",
    //   orderId: req.body.orderId,
    //   callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
    //   txnAmount: {
    //     value: req.body.subTotal,
    //     currency: "INR",
    //   },
    //   userInfo: {
    //     custId: req.body.email,
    //   },
    // };

    // /*
    //  * Generate checksum by parameters we have in body
    //  * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
    //  */
    // const checkSum = await PaytmChecksum.generateSignature(
    //   JSON.stringify(paytmParams.body),
    //   process.env.PAYTM_MKEY
    // );

    // var post_data = JSON.stringify(paytmParams);

    // const requestAsync = () => {
    //   return new Promise((resolve, reject) => {
    //     var options = {
    //       /* for Staging */
    //       hostname: "securegw-stage.paytm.in",

    //       /* for Production */
    //       // hostname: 'securegw.paytm.in',

    //       port: 443,
    //       path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.orderId}`,
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Content-Length": post_data.length,
    //       },
    //     };

    //     var response = "";
    //     var post_req = https.request(options, function (post_res) {
    //       post_res.on("data", function (chunk) {
    //         response += chunk;
    //       });

    //       post_res.on("end", function () {
    //         // console.log("Response: ", response);
    //         resolve(JSON.parse(response).body);
    //       });
    //     });

    //     post_req.write(post_data);
    //     post_req.end();
    //   });
    // };

    // let myRequest = await requestAsync();
    // res.status(200).json({success : true});
  }
};

export default connectDb(handler);
