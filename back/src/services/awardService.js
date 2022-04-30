import { Award } from "../db";

class awardService {

    static getAwardByUser({ user_id  }) {
        return Award.findByUser({ user_id });
    }

    static async deleteAward({ user_id }) {
        return Award.delete({ user_id });
    }
}

export { awardService };
