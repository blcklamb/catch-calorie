import { Router } from "express";
import moment from "moment";
import { login_required } from "../middlewares/login_required";
import { trackingService } from "../services/trackingService";

const trackingRouter = Router();

trackingRouter.get("/tracking/:user_id", async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const date = moment().format("YYYY-MM-DD");

        const tracking = await trackingService.getTrackingByUserAndDate({ user_id, date });
        if (!tracking) return trackingService.addTracking({ user_id, date });

        return res.status(200).send(tracking);
    } catch (error) {
        next(error);
    }
});

trackingRouter.post("/tracking/food", async (req, res, next) => {
    try {
        // const { currentUserId } = req;
        const { name, gram } = req.body;
        const date = moment().format("YYYY-MM-DD");

        const newTracking = await trackingService.addFoodTracking({ user_id: "626751e37f0a6752662edaf6", date, name, gram });

        return res.status(201).json(newTracking);
    } catch (error) {
        next(error);
    }
});

trackingRouter.post("/tracking/exer", async (req, res, next) => {
    try {
        // const { currentUserId } = req;
        const { name, minute } = req.body;
        const date = moment().format("YYYY-MM-DD");

        const newTracking = await trackingService.addExerTracking({ user_id: "626751e37f0a6752662edaf6", date, name, minute });

        return res.status(201).json(newTracking);
    } catch (error) {
        next(error);
    }
});

trackingRouter.put("/tracking/food", async (req, res, next) => {
    try {
        const { id, gram } = req.body;

        const updatedTracking = await trackingService.setFoodTracking({ id }, { gram });

        return res.status(200).send(updatedTracking);
    } catch (error) {
        next(error);
    }
});

trackingRouter.put("/tracking/exer", async (req, res, next) => {
    try {
        const { id, minute } = req.body;

        const updatedTracking = await trackingService.setExerTracking({ id }, { minute });

        return res.status(200).send(updatedTracking);
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

export { trackingRouter };
