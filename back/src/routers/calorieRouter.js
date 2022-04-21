import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { calorieService } from "../services/calorieService";

const calorieRouter = Router();

// 특정 유저의 새로운 칼로리 정보 등록하기
calorieRouter.post("/calorie/create")

// 특정 유저의 칼로리 정보 불러오기
calorieRouter.get("/calorie/:id")

// 특정 유저의 칼로리 정보 수정하기
calorieRouter.put("/calorie/:id")

// 특정 유저의 칼로지 정보 삭제하기
calorieRouter.delete("/calorie/:id")

export { calorieRouter };