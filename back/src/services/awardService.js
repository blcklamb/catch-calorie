import { Award } from "../db";

class awardService {
    static async addAward({ user_id }) {
        const userAward = await Award.findByUser({ user_id });
        if (userAward) return { errorMessage: "awardService 이미 생성된 award입니다" };

        return Award.create({ user_id });
    }

    static getAwardByUser({ user_id  }) {
        return Award.findByUser({ user_id });
    }

    static deleteAward({ user_id }) {
        return Award.delete({ user_id });
    }
}

export { awardService };
