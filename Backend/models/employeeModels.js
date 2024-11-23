const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ },
    mobile: { type: String, required: true, match: /^[0-9]{10}$/ },
    designation: { type: String, required: true },
    gender: { type: String, required: true , enum: ["Male", "Female", "Other"]},
    course: { type: [String], required: true }, 

    password: { 
        type: String, 
        required: true, 
        minlength: 6 
    },
    image: { 
        type: String, 
        required: false 
    },
   
},{
    versionKey:false,
    timestamps:true
})

module.exports = mongoose.model('EmployeeManagement',employeeSchema)