import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import router from "../backend/v1.js";


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req, res) => {
    res.send("Welcome to SnapMap API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));