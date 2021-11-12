const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")
const app=express();


//db connect
dotenv.config()
mongoose.connect(process.env.DB_CONNECT,{
    useUnifiedTopology: true, useNewUrlParser: true
}).then(()=>{
    console.log("Db is connect")
}).catch((err)=>{
    console.log(err)
})
//import route
app.use(express.json());
app.use(cors());

const registerRoutes=require("./rotes/registerRouter");
const placesRoutes=require("./rotes/placesRoutes");
// app.use("/users",registerRoutes);
app.use("/",placesRoutes);

app.listen(3000,()=>{
    console.log("Server is running on 3000")
})