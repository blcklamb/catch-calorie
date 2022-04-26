import rateLimit from "express-rate-limit";
import { Router } from "express";
import { foodService } from "../services/foodService";

const foodRouter = Router();

foodRouter.post("/foods/register", async (req, res, next) => {
    try {
        const { category, name, kcal_per100g } = req.body;

        // 로그인 된 유저의 모든 food를 불러온 후 겹치는 제목이 있을경우 에러 발생.
        const foods = await foodService.getFoodByName({ name });
        if (foods) throw new Error("이미 사용중인 제목입니다.");

        const newFood = await foodService.addFood({ category, name, kcal_per100g });

        return res.status(201).json(newFood);
    } catch (error) {
        next(error);
    }
});

foodRouter.get("/foods", rateLimit({ windowMs: 1000, max: 5 }), async (req, res, next) => {
    try {
        const foods = await foodService.getFoodAll();
        return res.status(200).json(foods);
    } catch (error) {
        next(error);
    }
});

foodRouter.post("/api/foods/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        await foodService.addFoodViews({ id });

        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

export { foodRouter };
