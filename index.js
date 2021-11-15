const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")
const app=express();

//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`)
    console.log("shutting down server due to uncaught exception")
    server.close(()=>{
        process.exit(1);
    });
})

//db connect
dotenv.config()
mongoose.connect(process.env.DB_CONNECT,{
    useUnifiedTopology: true, useNewUrlParser: true
}).then(()=>{
    console.log("Db is connect")
})
//import route
app.use(express.json());
app.use(cors());

const registerRoutes=require("./rotes/registerRouter");
const placesRoutes=require("./rotes/placesRoutes");
app.use("/",registerRoutes);
app.use("/",placesRoutes);

const server=app.listen(3000,()=>{
    console.log("Server is running on 3000")
})


//unhandle promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`)
    console.log("shutting down server due to unhandle promise rejection")
    server.close(()=>{
        process.exit(1);
    });
});