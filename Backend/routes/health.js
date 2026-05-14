import express from "express";
import { getHealthAnalysis } from "../controller/health.controller.js";

const Router = express.Router();
Router.get("/health", getHealthAnalysis);

export default Router;