import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { feedbackRoutes } from "./feedback.routes";

export const routes = Router();

routes.use("/", authenticateRoutes);
routes.use("/feedbacks", feedbackRoutes);