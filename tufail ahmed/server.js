const express = require("express");
const mangoose = require("mongoose");
const StudentRouter = require("./routes/studentRouter");
const InstituteRouter = require("./routes/instituteRouter")
const TeacherRouter = require("./routes/teacherRouter");
const CourseRouter = require("./routes/courseRouter");
require("dotenv").config();

const app = express();
app.use(express.json())

app.use("/api/student", StudentRouter);
app.use("/api/institute",InstituteRouter);
app.use("/api/teacher",TeacherRouter);
app.use("/api/course",CourseRouter);

mangoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Database Connected Successfully and Server is Listening on this port 5000"
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

