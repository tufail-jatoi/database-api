const express = require("express");
const route = express.Router();
const {sendResponse} = require("../Helper/helper")
const StudentModel = require("../models/studentModel")
// Internel Server Error

route.get("/", async (req, res) => {
  try {
    const result = await StudentModel.find();
    if (!result) {
      res.send(sendResponse(false, null, "No Data Found")).status(404);
    } else {
      res.send(sendResponse(true, result)).status(200);
    }
  } catch (e) {
    console.log(e);
    res.send(sendResponse(false)).status(400);
  }
});

route.get("/:id", (req, res) => {
  res.send("Get Single Student Data");
});

route.post("/", async(req, res) => {
    const {firstName,lastName,contact,course} = req.body;
    try{
        let errArr = []
        if(!firstName){
          errArr.push("Required : FirstName")
        }
        if(!contact){
          errArr.push("Required : Contact")
        }
        if(!course){
            errArr.push("Required : Course")
        }
        if(errArr.length > 0){
            res.send(sendResponse(false,errArr,null,"Required All Field",))
            .status(400);
            return;
        }
        else{
            let Obj = {
                firstName,
                lastName,
                contact,
                course
            };
        let student = new StudentModel(Obj)
        await student.save()
        if(!student){
            res.send(sendResponse(false,null,"Internel Server Error")).status(400);
        }else{
            res.send(sendResponse(true,student,"Saved Successfully")).status(200);
        }
        }
    }catch(e){
        res.send(sendResponse(false,null,"Internel Server Error")).status(404);
    }
});
route.put("/:id", (req, res) => {
  res.send("Edit Student Data");
});
route.delete("/:id", (req, res) => {
  res.send("Delete Data");
});

module.exports = route;
