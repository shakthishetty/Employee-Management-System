const express = require("express");
const path = require("path");
const upload = require("../config/multerConfig");
const {
  getEmployee,
  getSingleEmployee,
  createEmployee,
  loginEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const router = express.Router();


router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

router.get("/employees", getEmployee);
router.get("/employees/:id", getSingleEmployee);
router.post("/employees", createEmployee);
router.post("/loginEmployee", loginEmployee);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);



router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: err.message });
        }
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded' });
        }

       
        const filePath = `/uploads/${req.file.filename}`; 

        
        res.status(200).send({
            filename: req.file.filename,
            filePath,
            message: 'File uploaded successfully',
        });
    });
});

module.exports = router;
