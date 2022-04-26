import { TrackingModel } from "../schemas/tracking";

class Tracking {
    static create({ user_id, date, rec_cal }) {
        return TrackingModel.create({ user_id, date, rec_cal });
    }

    static findByRecordId({ id }, { record }) {
        switch (record) {
            case "food":
                return TrackingModel.findOne({ food_record: { $elemMatch: { id } } });
            case "exer":
                return TrackingModel.findOne({ exer_record: { $elemMatch: { id } } });
        }
    }

    static findByUserAndDate({ user_id, date }) {
        return TrackingModel.findOne({ user_id, date });
    }

    static findAll({ user_id }) {
        return TrackingModel.find({ user_id }).sort({ createdAt: 1 });
    }

    static update({ user_id, date }, { toUpdate }) {
        return TrackingModel.findOneAndUpdate({ user_id, date }, toUpdate, { new: true });
    }

    static delete({ id }) {
        return TrackingModel.deleteById(id);
    }
}

export { Tracking };
