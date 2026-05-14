import express from "express";
import { getHealthAnalysis } from "../controller/health.controller.js";
import authMiddleware from "../middlewares/auth.js";

const Router = express.Router();
Router.get("/", authMiddleware, getHealthAnalysis);

export default Router;