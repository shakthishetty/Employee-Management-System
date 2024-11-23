const employees = require("../models/employeeModels")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const upload = require('../config/multerConfig'); 
require('dotenv').config();

let getEmployee = async(req,res)=>{
    try{
        let employee = await employees.find({})
        res.status(200).json({error:false,message:"employee fetched succefully",data:employee})
    }catch(err){
        res.status(500).json({error:true,message:err.message})
    }
    
}


let getSingleEmployee = async(req,res)=>{
    try{
        let {id} = req.params
        let employee = await employees.findById(id)
        res.status(200).json({error:false,message:"employee fetched succefully",data:employee})
    }catch(err){
        res.status(500).json({error:true,message:err.message})
    }
  
}

let createEmployee = async(req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: true, message: err.message });
        }
        
        try {
            let { userName, email, mobile, designation, gender, course, password, confirmPassword } = req.body;

            if (!userName || !email || !mobile || !designation || !gender || !course || !password) {
                return res.status(400).json({ error: true, message: "Field is required" });
            }

            if (password !== confirmPassword) {
                return res.status(400).json({ error: true, message: "Password and Confirm Password are not matching" });
            }

            let mobileAvailable = await employees.findOne({ mobile });
            let emailAvailable = await employees.findOne({ email });
            if (mobileAvailable) {
                return res.status(409).json({ error: true, message: "Employee is already exists with given mobile number" });
            }
            if (emailAvailable) {
                return res.status(409).json({ error: true, message: "Employee is already exists with given email" });
            }

            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(confirmPassword, salt);

           
            const employee = await employees.create({
                userName,
                email,
                mobile,
                designation,
                gender,
                course,
                password: hashedPassword,
                image: req.file ? req.file.path : null 
            });

            res.status(200).json({ error: false, message: "Employee registered successfully", data: employee });
        } catch (err) {
            res.status(500).json({ error: true, message: err.message });
        }
    });
};
let loginEmployee = async (req,res)=>{
    try{
     let {userName,mobile,email,password} = req.body
     let registeredEmployee = await employees.findOne({$or:[{userName}, {mobile},{email} ] })
     if(registeredEmployee){
        let passwordMatching = await bcrypt.compare(password,registeredEmployee.password)
        if(passwordMatching){
          
            let token = jwt.sign({userName:registeredEmployee.userName,mobile:registeredEmployee.mobile,email:registeredEmployee.email},
                process.env.JWT_SECRET,{expiresIn:"3m"})
                res.status(200).json({error:false,message:"Login Succefull",token,userName: registeredEmployee.userName})
        }else{
            res.status(401).json({error:true,message:"Invalid Password"})
        }
     }else{
        return res.status(404).json({ error: true, message: "No Employee found with given Username"})
     }
    }catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

let updateEmployee = async(req,res)=>{
    try{
        const {id} = req.params
        let {userName,email,mobile,designation,gender,course} = req.body
         let employeeAvailable = await employees.findById(id)
         if(employeeAvailable){
            let employee = await employees.findByIdAndUpdate(id,{$set:{userName,email,mobile,designation,gender,course}},{new:true,runValidators:true})
            res.status(200).json({error:false,message:"employee updated succefully",data:employee})
         }else{
           return res.status(404).json({error:true,message:"employee not found with given ID",data:null})
         }
       
     
    }catch(err){
        res.status(200).json({error:true,message:err.message})
    }

}

let deleteEmployee = async(req,res)=>{
    try{
        const {id} = req.params
        const employee = await employees.findByIdAndDelete(id)
        if(employee){
           return res.status(200).json({error:false,message:"employee deleted succefully"})
        }else{
            return res.status(404).json({error:true,message:"employee not found with given ID"})
        }
        
    }catch(err){
        res.status(200).json({error:true,message:err.message})
    }
    
}

module.exports={getEmployee,getSingleEmployee,createEmployee,loginEmployee,updateEmployee,deleteEmployee}