import rateLimit from "express-rate-limit";
import { Router } from "express";
import { foodService } from "../services/foodService";
import configureMeasurements, { mass } from "convert-units";

const convert = configureMeasurements({ mass });
const foodRouter = Router();

// DB에 없는 음식을 새로 등록할 때
foodRouter.post("/foods", async (req, res, next) => {
    try {
        const { category, name, kcal, unit } = req.body;
        if (typeof(category) !== string) throw new Error("category 문자 아님");
        // if (typeof(kcal) !== number) throw new Error("kcal 숫자 아님");
        // if (typeof(name) !== string) throw new Error("name 문자 아님");
        // if (typeof(unit) !== string) throw new Error("unit 문자 아님");
        // if (typeof(category) !== string) throw new Error("category 문자 아님");

        // 로그인 된 유저의 모든 food를 불러온 후 겹치는 제목이 있을경우 에러 발생.
        const foods = await foodService.getFoodByName({ name });
        if (foods) throw new Error("이미 등록되어 있는 음식입니다.");
        const num = 1;
        console.log(convert(num).from("lb").to("g"))
        console.log(convert(1).from("lb").to("g"))
        // const { kcal_per_100g, kcal_per_lb } = await foodService.convertUnit({ kcal, unit });
        // const kcal_per_100g = unit === "gram" ? kcal : convert(kcal).from("lb").to("g").toFixed(2) * 100;
        const kcal_per_lb = unit === "pound" ? kcal: convert(kcal * 100).from("g").to("lb").toFixed(2);
        const kcal_per_100g = unit === "gram" ? kcal : (convert(kcal * 1).from("lb").to("g") / 100).toFixed(2);

        const newFood = await foodService.addFood({ category, name, kcal_per_100g, kcal_per_lb, views: 1 });

        return res.status(201).json(newFood);
    } catch (error) {
        next(error);
    }
});

// 검색창에 검색할 때 모든 리스트 불러내는 요청
foodRouter.get("/foods", rateLimit({ windowMs: 1000, max: 5 }), async (req, res, next) => {
    try {
        const foods = await foodService.getFoodAll();

        return res.status(200).json(foods);
    } catch (error) {
        next(error);
    }
});

// 검색 후 등록해서 조회수 올리는 요청
foodRouter.post("/foods/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        await foodService.addFoodViews({ id });

        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

export { foodRouter };
