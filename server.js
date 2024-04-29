import {app} from "./app.js";
import Razorpay from "razorpay"

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.REAZORPAY_SECRET_KEY,
  });

app.listen(process.env.PORT, () => {
console.log(`Server is working on ${process.env.PORT}`);
}); 