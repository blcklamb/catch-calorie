import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";

const userAuthRouter = Router();

// 회원가입
userAuthRouter.post("/users/register", async (req, res, next) => {
    try {
        // if (is.emptyObject(req.body)) {
        //     throw new Error("header의 Content-Type을 application/json으로 설정해주세요.");
        // }
        const { email, password, name, gender, height, weight, icon } = req.body;

        const newUser = await userAuthService.addUser({
            email,
            password,
            name,
            gender,
            height,
            weight,
            //이미지 처리는 후에 진행할 예정
            icon,
        });

        if (newUser.errorMessage) {
            throw new Error(newUser.errorMessage);
        }

        return res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

// 로그인
userAuthRouter.post("/users/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userAuthService.getUser({ email, password });

        if (user.errorMessage) {
            throw new Error(user.errorMessage);
        }

        return res.status(201).send(user);
    } catch (error) {
        next(error);
    }
});

// 특정 유저 정보 가져오기
userAuthRouter.get("/users/:id", login_required, async (req, res, next) => {
    try {
        const { id } = req.params;

        const currentUserInfo = await userAuthService.getUserById({ id });
        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        return res.status(200).send(currentUserInfo);
    } catch (error) {
        next(error);
    }
});

// 전체 유저 목록 가져오기
userAuthRouter.get("/users", login_required, async (req, res, next) => {
    try {
        const users = await userAuthService.getUsers();

        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

// 회원 탈퇴하기
userAuthRouter.delete("/users/:id", login_required, async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedUser = await userAuthService.deleteUser({ id });

        return res.status(200).json(deletedUser);
    } catch (error) {
        next(error);
    }
});

// 회원 정보 수정하기
userAuthRouter.put("/users/:id", login_required, async function (req, res, next) {
    try {
        // URI로부터 사용자 id를 추출함.
        const { id } = req.params;

        const { email, name, gender, height, weight, icon, status } = req.body;
        
        if (name===null || height===null || weight===null || icon==null || status==null) {
            throw new Error("빈 내역이 있습니다 확인해주세요")
        }

        const toUpdate = { name,  height, weight, icon, status };

        // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
        const updatedUser = await userAuthService.setUser({ user_id: id, toUpdate });

        if (updatedUser.errorMessage) {
            throw new Error(updatedUser.errorMessage);
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

// userAuthRouter.put("/password", login_required, async function(req, res, next){
//     try{
//         const { old_pw, new_pw } = req.body;
//         await userAuthRouter.setUser({ })
//     } catch (error) {
//         next(error);
//     }
    

// });

export { userAuthRouter };
