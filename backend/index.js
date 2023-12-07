import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productRoute.js"


// configure env
dotenv.config()
//database config
connectDB()

const app = express()
//midlewares

app.use(express.json())
app.use(morgan('dev'))

// routes
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/category", categoryRoute)
app.use("/api/v1/product", productRoute)
// rest api 

app.get("/",(req, res) => {
    res.send("Server is running")
});
//PORT
const PORT=  process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server running on ${process.env.DEV_MODE} mode on  ${PORT}`.bgCyan.white)
})