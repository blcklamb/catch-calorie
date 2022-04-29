import { TrackingModel } from "../schemas/tracking";

class Tracking {
    static create({ user_id, date, rec_cal }) {
        return TrackingModel.create({ user_id, date, rec_cal });
    }

    static findById({ id }) {
        return TrackingModel.findById(id);
    }

    static findByRecordId({ id, record }) {
        if (record === "food") {
            return TrackingModel.findOne({ food_record: { $elemMatch: { id } } });
        } else if (record === "exer") {
            return TrackingModel.findOne({ exer_record: { $elemMatch: { id } } });
        }
    }

    static findByUserAndDate({ user_id, date }) {
        return TrackingModel.findOne({ user_id, date });
    }

    static findByUser({ user_id }) {
        return TrackingModel.find({ user_id }).sort({ date: 1 });
    }

    static update({ user_id, date, toUpdate }) {
        return TrackingModel.findOneAndUpdate({ user_id, date }, toUpdate, { new: true });
    }

    static delete({ id }) {
        return TrackingModel.deleteById(id);
    }
}

export { Tracking };
