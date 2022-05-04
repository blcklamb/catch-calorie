import is from "@sindresorhus/is";
import { v4 as uuid } from "uuid";
import { Router } from "express";
import { userService } from "../services/userService";
import { awardService } from "../services/awardService";
import { login_required } from "../middlewares/login_required";
import sendMail from "../middlewares/send_mail";
import configureMeasurements, { mass, length } from 'convert-units';
const convert = configureMeasurements({mass, length});



const userRouter = Router();

// 회원가입
userRouter.post("/users/register", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error("header의 Content-Type을 application/json으로 설정해주세요.");
        }

        const { email, password, name, gender, height, weight, unit, icon } = req.body;

        const newUser = await userService.addUser({
            email,
            password,
            name,
            gender,
            height,
            weight,
            unit,
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
userRouter.post("/users/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userService.getUser({ email, password });

        if (user.errorMessage) {
            throw new Error(user.errorMessage);
        }

        return res.status(201).send(user);
    } catch (error) {
        next(error);
    }
});

// 특정 유저 정보 가져오기
userRouter.get("/users/:id", login_required, async (req, res, next) => {
    try {
        const { id } = req.params;

        const currentUserInfo = await userService.getUserById({ id });
        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        return res.status(200).send(currentUserInfo);
    } catch (error) {
        next(error);
    }
});

// 전체 유저 목록 가져오기
userRouter.get("/users", login_required, async (req, res, next) => {
    try {
        const users = await userService.getUsers();

        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

// 회원 탈퇴하기
userRouter.delete("/users/:id", login_required, async (req, res, next) => {
    try {
        const { id } = req.params;

        await userService.deleteUser({ id });

        await awardService.deleteAward({ user_id: id });

        return res.status(200).json({ result: "success" });
    } catch (error) {
        next(error);
    }
});

// 회원 정보 수정하기
userRouter.put("/users/:id", login_required, async (req, res, next) => {
    try {
        // URI로부터 사용자 id를 추출함.
        const { id } = req.params;

        const { name, height, weight, unit, open, icon, status } = req.body;

        if (name === null || height === null || weight === null || icon == null || status == null || unit == null || open == null) {
            throw new Error("입력되지 않은 정보가 있습니다.");
        }

        const converted_height = (unit ==="us") ? convert(height).from('ft').to('cm').toFixed(0): height
        const converted_weight = (unit ==="us") ? convert(weight).from('lb').to('kg').toFixed(0): weight

        const toUpdate = { 
            name, 
            height: converted_height, 
            weight: converted_weight, 
            unit, 
            open, 
            icon, 
            status };

        // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
        const updatedUser = await userService.setUser({ id, toUpdate });
        if (updatedUser.errorMessage) {
            throw new Error(updatedUser.errorMessage);
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

// 회원가입 인증 이메일 발송
userRouter.get("/users/email/:email", async (req, res, next) => {
    try {
        const { email } = req.params;
        const code = uuid().split("-")[0];

        await sendMail(
            email, //
            "[Catch Calorie] Hi, We are happy you signed up for Catch Calorie",
            `Your verification code is [${code}].\n Please complete signing up.`,
        );

        return res.status(200).send(code);
    } catch (error) {
        next(error);
    }
});

userRouter.put("/password", login_required, async (req, res, next) => {
    try {
        const id = req.currentUserId;
        const { old_pw, new_pw } = req.body;

        const user = await userService.setPassword({ id, old_pw, new_pw });

        if (!user) {
            throw new Error("비밀번호 설정 실패");
        }

        return res.send(user);
    } catch (error) {
        next(error);
    }
});

// 임시 비밀번호 발급하기
userRouter.put("/password/init", async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userService.sendNewpassword({ email });
        return res.send("Successfully send");
    } catch (error) {
        next(error);
    }
});

userRouter.get("/users/login/github", async (req, res) => {
    try {
        const { code } = req.query;

        const base = "https://github.com/login/oauth/access_token";
        const params = new URLSearchParams({
            client_id: process.env.GITHUB_ID,
            client_secret: process.env.GITHUB_SECRET,
            code,
        }).toString();
        const url = `${base}?${params}`;

        const token = await fetch(url, {
            method: "POST",
            headers: { Accept: "application/json" },
        }).then((res) => res.json());

        const { access_token } = token;
        const api = "https://api.github.com";
        const data = await fetch(`${api}/user`, {
            headers: {
                Authorization: `token ${access_token}`,
            },
        }).then((res) => res.json());

        const emailData = await fetch(`${api}/user/emails`, {
            headers: {
                Authorization: `token ${access_token}`,
            },
        }).then((res) => res.json());
        const { email } = emailData.find((email) => email.primary === true && email.verified === true);

        // user 정보  처리
        let user = await userService.getUserByEmail({ email });
        if (!user) {
            user = await userService.addUser({
                name: data.name || data.login,
                email,
                description: data.bio || "Hello World!",
            });
        }

        const { _id, name, description, oauth } = user;

        return res.status(200).json({
            token: jwt.sign({ user_id: _id }, process.env.JWT_SECRET_KEY || "secret-key"),
            _id,
            email,
            name,
            description,
            oauth,
        });
    } catch (error) {
        next(error);
    }
});

export { userRouter };
