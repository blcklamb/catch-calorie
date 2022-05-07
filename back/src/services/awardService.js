import { Award } from "../db";

class awardService {
    static addAward({ user_id }) {
        return Award.create({ user_id });
    }

    static getAwardByUser({ user_id }) {
        return Award.findByUser({ user_id });
    }

    static deleteAward({ user_id }) {
        return Award.delete({ user_id });
    }
}

export { awardService };
