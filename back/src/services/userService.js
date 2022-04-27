import { User } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class userAuthService {
    // 회원 정보 추가
    static async addUser({ email, password, name, gender, height, weight, icon }) {
        const user = await User.findOne({ email });
        if (user) {
            const errorMessage = "현재 사용 중인 이메일입니다. 다른 이메일을 입력해주세요.";
            return { errorMessage };
        }

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

        const createdNewUser = await User.create({ newUser });
        return createdNewUser;
    }

    // 로그인 회원 정보 가져오기
    static async getUser({ email, password }) {
        const user = await User.findOne({ email });
        
        // 가입 내역이 없는 경우
        if (!user) {
            const errorMessage = "가입 내역이 없는 이메일입니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        // 비밀번호가 일치하지 않은 경우
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            const errorMessage = "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        // 로그인 성공 시 JWT 웹 토큰 생성
        const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
        const token = jwt.sign({ user_id: user._id }, secretKey, { expiresIn: "2h" });
        const loginUser = {
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
        return loginUser;
    }

    // 전체 유저 목록 가져오기
    static getUsers() {
        return User.findAll();
    }

    // 로그인한 사용자 정보 가져오기
    static async getUserById({ id }) {
        console.log({id})
        const user = await User.findById( { id } );
        if (!user) {
            const errorMessage = "가입 내역이 없는 사용자입니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        return user;
    }

    // 회원 정보 삭제하기
    static async deleteUser({ id }) {
        const user = await User.delete({ id });
        user.errorMessage = "회원탈퇴했습니다."
        return user;
    }

    static async setUser({ user_id, toUpdate }) {
        // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
        let user = await User.findById({ user_id });
    
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!user) {
            const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
    
        if (toUpdate.email) {
            const fieldToUpdate = "email";
            const newValue = toUpdate.email;
            user = await User.update({ user_id, fieldToUpdate, newValue });
        }

        if (toUpdate.password) {
            const fieldToUpdate = "password";
            const newValue = toUpdate.password;
            const hashedPassword = await bcrypt.hash(newValue, 10);
            user = await User.update({ user_id, fieldToUpdate, hashedPassword });
        }
    
        if (toUpdate.name) {
            const fieldToUpdate = "name";
            const newValue = toUpdate.name;
            user = await User.update({ user_id, fieldToUpdate, newValue });
        }

        if (toUpdate.height) {
            const fieldToUpdate = "height";
            const newValue = toUpdate.height;
            user = await User.update({ user_id, fieldToUpdate, newValue });
        }

        if(toUpdate.weight) {
            const fieldToUpdate = "height";
            const newValue = toUpdate.height;
            user = await User.update({ user_id, fieldToUpdate, newValue });
        }

        if(toUpdate.icon) {
            const fieldToUpdate = "icon";
            const newValue = toUpdate.icon;
            user = await User.update({ user_id, fieldToUpdate, newValue });
        }

        if(toUpdate.status) {
            const fieldToUpdate = "status";
            const newValue = toUpdate.status;
            user = await User.update({ user_id, fieldToUpdate, newValue });
        }

    
        return user;
      }

}

export { userAuthService };
