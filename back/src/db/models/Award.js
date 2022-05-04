import { AwardModel } from "../schemas/award";

class Award {
    static create({ user_id }) {
        return AwardModel.create({ user_id });
    }

    static findByUser({ user_id }) {
        return AwardModel.findOne({ user_id });
    }

    static update({ user_id }, toUpdate) {
        return AwardModel.findOneAndUpdate({ user_id }, toUpdate, { new: true });
    }

    static delete({ user_id }) {
        return AwardModel.remove({ user_id });
    }
}

export { Award };
