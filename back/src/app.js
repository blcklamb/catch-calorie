import cors from "cors";
import express from "express";
import { userAuthRouter } from "./routers/userRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js"

const app = express();

app.use(cors());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
// 브라우저에서 로그아웃 시 연결되게 하여 쿠키에 저장된 refresh token 삭제
app.get("/", (req, res) => {
    res.send("안녕하세요, 13팀 프로젝트 API 입니다.");
});

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use(userAuthRouter);

app.use(errorMiddleware);

export { app };