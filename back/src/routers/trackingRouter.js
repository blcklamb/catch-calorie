import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import { trackingService } from "../services/trackingService.js";

const trackingRouter = Router();

trackingRouter.post("/tracking/food", async (req, res, next) => {
    try {
        const { data } = req.body;
        // const { currentUserId } = req;

        const newTracking = await trackingService.addFoodTracking({ user_id: "6260310b4d722e533e70e419", data });

        return res.status(201).json(newTracking);
    } catch (error) {
        next(error);
    }
});

trackingRouter.post("/tracking/exer", async (req, res, next) => {
    try {
        const { data } = req.body;

        const newTracking = await trackingService.addExerTracking({ user_id: "6260310b4d722e533e70e419", data });

        if (newTracking.errorMessage) {
            throw new Error(newTracking.errorMessage);
        }

        return res.status(201).json(newTracking);
    } catch (error) {
        next(error);
    }
});

trackingRouter.get("/tracking/current", login_required, async (req, res, next) => {
    try {
        const { currentUserId } = req;

        return res.status(200).send(currentUserInfo);
    } catch (error) {
        next(error);
    }
});

trackingRouter.get("/tracking/:user_id", async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const currentUserInfo = await trackingService.getTrackingByUser({ user_id });

        return res.status(200).send(currentUserInfo);
    } catch (error) {
        next(error);
    }
});

export { trackingRouter };
