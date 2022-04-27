import { AwardModel } from "../schemas/award";

class Award {
    static create({ user_id }) {
        return AwardModel.create({ user_id });
    }

    static findById({ user_id }) {
        return AwardModel.findOne({ user_id });
    }

    static update({ user_id }, { toUpdate }) {
        return AwardModel.findOneAndUpdate({ user_id }, { toUpdate });
    }
}

export { Award };
