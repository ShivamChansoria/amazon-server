import Razorpay from "razorpay";
import { instance } from "../server.js"

import { createRequire } from 'module';
import crypto,{ Hmac } from "crypto";
const require = createRequire(import.meta.url);

const { validatePaymentVerification, validateWebhookSignature } = require('../node_modules/razorpay/dist/utils/razorpay-utils.js');


export const checkout = async (req, res) =>{
    
    const options = {
      amount: Number(req.body.cartTotal *100),  // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
        success: true,
        order
    })

};

export const paymentVerification = async (req, res) =>{
  const {razorpay_payment_id, razorpay_order_id,  razorpay_signature} = req.body;
  console.log(req.body);

  const body = razorpay_order_id + "|" + razorpay_payment_id;

 const generatedSignature = crypto.createHmac("sha256", process.env.REAZORPAY_SECRET_KEY).update(body.toString()).digest("hex");
  const valid = await validatePaymentVerification({"order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, process.env.REAZORPAY_SECRET_KEY);
  const isAuthentic = generatedSignature=== razorpay_signature; 
  
  if(isAuthentic){
    console.log(`Payment is authorized with orderid "${razorpay_order_id}" . and now redirecting to payment success page!!`);
    res.redirect(`https://amazone-clone-1.vercel.app/paymentsucess?reference=${razorpay_order_id}`)
  }
  else console.log(`Payment is not authorized with orderid ${razorpay_order_id}`);

//   res.status(200).json({
//     success: true,
// })
}