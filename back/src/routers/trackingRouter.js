import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { trackingService } from "../services/trackingService";

const trackingRouter = Router();

trackingRouter.post("/tracking/food", async (req, res, next) => {
    try {
        // const { currentUserId } = req;
        const { food, gram } = req.body;
        const date = new Date().toISOString().split("T")[0];

        const newTracking = await trackingService.addFoodTracking({ user_id: "6260310b4d722e533e70e419", date, food, gram });

        return res.status(201).json(newTracking);
    } catch (error) {
        next(error);
    }
});

trackingRouter.post("/tracking/exer", async (req, res, next) => {
    try {
        const { exer, hour } = req.body;
        const date = new Date().toISOString().split("T")[0];

        const newTracking = await trackingService.addExerTracking({ user_id: "6260310b4d722e533e70e419", date, exer, hour });

        if (newTracking.errorMessage) {
            throw new Error(newTracking.errorMessage);
        }

        return res.status(201).json(newTracking);
    } catch (error) {
        next(error);
    }
});

trackingRouter.delete("/tracking/food", async (req, res, next) => {
    try {
        const { id } = req.body;

        const deletedTracking = await trackingService.deleteFoodTracking({ id });

        return res.status(201).json(deletedTracking);
    } catch (error) {
        next(error);
    }
});

trackingRouter.delete("/tracking/exer", async (req, res, next) => {
    try {
        const { id } = req.body;

        const deletedTracking = await trackingService.deleteExerTracking({ id });

        return res.status(201).json(deletedTracking);
    } catch (error) {
        next(error);
    }
});

trackingRouter.get("/tracking/:user_id", async (req, res, next) => {
    try {
        // const { currentUserId } = req;
        const { user_id } = req.params;
        const date = new Date().toISOString().split("T")[0];

        const tracking = await trackingService.getTrackingByUserAndDate({ user_id, date });

        return res.status(200).send(tracking);
    } catch (error) {
        next(error);
    }
});

export { trackingRouter };
