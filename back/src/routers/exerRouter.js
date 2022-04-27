import rateLimit from "express-rate-limit";
import { Router } from "express";
import { exerService } from "../services/exerService";
import { login_required } from "../middlewares/login_required";

const exerRouter = Router();

// 검색창에 검색할 때 쓰는
exerRouter.get("/exercises", rateLimit({windowMs: 1000, max: 5}), async (req, res, next) => {
    try {
        const { search } = req.query;

        const exercise = await exerService.getExerByName({ search });
        if (exercise.errorMessage) throw new Error(exercise.errorMessage);
        
        return res.status(200).json(exercise);
    } catch (error) {
        next(error);
    }
});


// 검색
exerRouter.post("/exercises/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        await exerService.addExerViews({ id });

        return res.sendStatus(201);
    } catch (error) {
        next(error);
    }
});

// 운동 새로 등록할 때
exerRouter.post("/exercises", login_required, async (req, res, next) => {
    try {
        const { name, weight, unit } = req.body;

        const exercise = await exerService.getExerByName({ name });
        
        if (exercise) throw new Error("Router: 이미 등록되어 있는 운동입니다.");

        if (unit=='kilogram') {
            kcal_per_kg = weight;
            kcal_per_lb = weight*2.20462
        } else if (unit=='pound') {
            kcal_per_kg = weight*0.453592;
            kcal_per_lb = weight;
        }

        const newExercise = await exerService.addExer({ 
            name, 
            kcal_per_lb,
            kcal_per_kg,
            views: 1
        });
        if (newExercise.errorMessage) throw new Error(newExercise.errorMessage);

        return res.status(201).json(newExercise);
    } catch(error) {
        next(error);
    }
});

export { exerRouter };