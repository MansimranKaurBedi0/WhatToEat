import express from "express";
import { getHealthAnalysis } from "../controller/health.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const Router = express.Router();
Router.get("/health", authMiddleware, getHealthAnalysis);

export default Router;