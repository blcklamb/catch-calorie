import { Router } from "express";
import { badgeService } from "../services/badgeService";

const badgeRouter = Router();

badgeRouter.get("/badges", async (req, res, next) => {
    try {
        const badges = await badgeService.getBadges();

        return res.status(200).json(badges);
    } catch (error) {
        next(error);
    }
});

export { badgeRouter };
