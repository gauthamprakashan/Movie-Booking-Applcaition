console.log("hello")
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userrouter from "./routes/user-routes";
import adminrouter from "./routes/admin-routes";
import movierouter from "./routes/movie-routes";
import cors from "cors";
import bookingsRouter from "./routes/booking-routes";


dotenv.config();

const app = express();
//middleware
app.use(express.json());
app.use(cors());
app.use("/user", userrouter);
app.use("/admin", adminrouter);
app.use("/movie", movierouter);
app.use("/booking",bookingsRouter);

mongoose
.connect(
    `mongodb+srv://itsgauthamp:${process.env.MONGODB_PASSWORD}@cluster0.xfkrdny.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(()=>
        app.listen(5000,() => 
            console.log("Connected")
    )
    )
    .catch((e) => console.log(e));

    
app.use("/", (req,res,next)=> {
    res.send("Check");
});

