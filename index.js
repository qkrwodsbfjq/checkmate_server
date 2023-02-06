require("dotenv").config();
const express = require('./config/express');

//const checkboardRouter = require('./src/app/checkboard/checkboardRouter');
//const userRouter = require("./src/app/user/userRouter");

const app = express();

//app.use("/", checkboardRouter);
//app.use("/user", userRouter);

app.listen(process.env.SERVER_PORT,()=>console.log(`server is ready! on ${process.env.SERVER_PORT}`))