import express from "express"
import healthRoute from "../backend/routes/health.js";
import authRoute from "../backend/routes/auth.js";

const router = express.Router();

router.use("/health", healthRoute);
router.use("/auth", authRoute);
router.get("/", (req, res) => {
    res.send("SnapMap API v1");
});

export default router