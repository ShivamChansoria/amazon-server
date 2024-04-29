import { config } from 'dotenv';
import router from './routes/routes.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express=require("express");
export const app = express();
const cors=require("cors");

config({ path: "./config/config.env"});
app.use(express.json());


app.use(express.urlencoded({ extended: true }));



app.use(cors());
app.use("/api", router);
app.use("/api/getkey", (req, res) => 
   res.status(200).json({ key: process.env.RAZORPAY_API_KEY})
)
