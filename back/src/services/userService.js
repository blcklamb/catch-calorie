import { User } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import nodemailer from "nodemailer";

class userService {
    // 회원 정보 추가
    static async addUser({ email, password, name, gender, height, weight, icon }) {
        const user = await User.findOne({ email });
        if (user) return { errorMessage: "현재 사용 중인 이메일입니다. 다른 이메일을 입력해주세요." };

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            email,
            password: hashedPassword,
            name,
            gender,
            height,
            weight,
            icon,
        };

        return User.create({ newUser });
    }

    // 로그인 회원 정보 가져오기
    static async getUser({ email, password }) {
        const user = await User.findOne({ email });
        if (!user) return { errorMessage: "가입 내역이 없는 이메일입니다. 다시 한 번 확인해 주세요." };

        // 비밀번호가 일치하지 않은 경우
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) return { errorMessage: "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요." };

        // 로그인 성공 시 JWT 웹 토큰 생성
        const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
        const token = jwt.sign({ user_id: user._id }, secretKey, { expiresIn: "2h" });

        return {
            token,
            id: user._id,
            email: user.email,
            name: user.name,
            gender: user.gender,
            height: user.height,
            weight: user.weight,
            icon: user.icon,
            errorMessage: null,
        };
    }

    static getUserByEmail({ email }) {
        return User.findOne({ email });
    }

    // 전체 유저 목록 가져오기
    static getUsers() {
        return User.findAll();
    }

    //사용자 정보 조회 시
    static async getUserById({ id }) {
        const user = await User.findById({ id });
        if (!user) return { errorMessage: "가입 내역이 없는 사용자입니다. 다시 한 번 확인해 주세요." };
        return user;
    }

    // 회원 정보 수정하기
    static async setUser({ id, toUpdate }) {
        // 해당 id 의 유저가 db에 존재하는지 여부 확인, 찾지 못한 경우 에러 메시지 반환
        let user = await User.findById({ id });
        if (!user) return { errorMessage: "가입 내역이 없습니다. 다시 한 번 확인해 주세요." };
        return User.update({ id, toUpdate });
    }

    // 회원 정보 삭제하기
    static async deleteUser({ id }) {
        const user = await User.delete({ id });
        user.errorMessage = "회원탈퇴했습니다.";
        return user;
    }

    // 로그인한 회원 비밀번호 수정하기
    static async setPassword({ id, old_pw, new_pw }) {
        const user = await User.findById({ id });
        const pass = await bcrypt.compare(old_pw, user.password);

        if (!pass) {
            throw new Error("비밀번호를 정확하게 입력해주세요.");
        }

        const hashedPassword = await bcrypt.hash(new_pw, 10);
        const toUpdate = { password: hashedPassword };

        return User.update({ id, toUpdate });
    }

    // 임시비밀번호 발급
    static async sendNewpassword({ email }) {
        const mailOption = {
            service: "Naver",
            host: "smtp.namer.com",
            port: 587,
            auth: {
                user: process.env.NODEMAIL_EMAIL,
                pass: process.env.NODEMAIL_PW,
            },
        };

        const temp_pw = uuid().split("-")[0];

        const message = {
            from: process.env.NODEMAIL_EMAIL,
            to: email,
            subject: "Catch Calorie 임시 비밀번호 발급 안내 메일입니다.",
            text: temp_pw,
        };

        const transporter = nodemailer.createTransport(mailOption);
        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });

        // 임시비밀번호로 비번 변경
        const user = await User.findOne({ email });
        const hashedTempPassword = await bcrypt.hash(temp_pw, 10);
        const toUpdate = { password: hashedTempPassword };
        const id = user._id;

        return User.update({ id, toUpdate });
    }

    static async addSocialUser({ email, name, gender, height, weight, icon }) {
        const user = await User.findOne({ email });
        if (user) return { errorMessage: "현재 사용 중인 이메일입니다. 다른 이메일을 입력해주세요." };

        const newUser = await User.create({ newUser: { email, name, gender, height, weight, icon } });
        const { _id } = newUser;
        const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
        const token = jwt.sign({ user_id: newUser._id }, secretKey, { expiresIn: "2h" });

        return { token, _id, email, name, gender, height, weight, icon };
    }
}

export { userService };
