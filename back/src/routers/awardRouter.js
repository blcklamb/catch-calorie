import { Router } from "express";
import { awardService } from "../services/awardService";

const awardRouter = Router();

awardRouter.get("/awards/:user_id", async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const userAward = await awardService. getAwardByUser({ user_id });
        if (!userAward) return awardService.addaward({ user_id });

        return res.status(200).send(userAward);
    } catch (error) {
        next(error);
    }
});

export { awardRouter };
