import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from "cors";
import route from './routes/userRoute.js';


const app = express();

app.use(bodyParser.json());
app.use(cors())
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
        .connect(MONGOURL)
        .then(() => {
            console.log('MongoDB connected successfully');
            app.listen(PORT, ()=>{
                 console.log(`Server is running on port ${PORT}`);
            })
        })

        .catch((error)=> console.log(error));  


  //dealing with the middlewares

  app.use("/api", route);