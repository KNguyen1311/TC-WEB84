import express from "express";
import mongoose from "mongoose";
import userRouter from "./Router/userRouter.js";



const app = express();
app.use(express.json());

try{
    
    await mongoose.connect('mongodb+srv://nguyennk2201:nguyennk2201@cluster0.nptev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
        console.log('Connected database!'); 
    })
    } catch (error){
        console.log(error)
    }

    app.use('/users', userRouter,);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});