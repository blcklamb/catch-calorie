import { Router } from "express";
import { heatmapService } from "../services/heatmapService";

const heatmapRouter = Router();

heatmapRouter.get("/heatmap/:user_id", async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const heatmap = await heatmapService.getHeatmap({ user_id });

        return res.status(201).json(heatmap);
    } catch (error) {
        next(error);
    }
});

export { heatmapRouter };
