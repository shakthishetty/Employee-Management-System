const express = require("express")
const route = require("./routers/employeeRouter")
const { connect, default: mongoose } = require("mongoose")
const path = require('path');
const connectDB = require("./helpers/dbConnect")
const cors = require('cors');



require('dotenv').config()

const app = express()
const port = 4000

app.use(express.json())
app.use(cors());
app.use("/api/employee/v1",route)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use("*",(req,res)=>{
    res.status(404).json({error:false,message:"Page Not Found "})
})

let startServer = async()=>{
     try{
       await connectDB(process.env.MONGO_URL)
       console.log("MongoDB Connected Succefully")
       app.listen(port,()=>{
        console.log(`the server is running in port ${port}`)
    })
     }catch(err){
        console.log(err)
     }
}
startServer()


