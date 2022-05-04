import { Router } from "express";
import { awardService } from "../services/awardService";

const awardRouter = Router();

// 사용자별 뱃지의 락/언락을 식별하기 위해 보내는 업적 정보
awardRouter.get("/awards/:user_id", async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const userAward = await awardService.getAwardByUser({ user_id });
        if (!userAward) await awardService.addAward({ user_id });

        return res.status(200).send(userAward);
    } catch (error) {
        next(error);
    }
});

export { awardRouter };
