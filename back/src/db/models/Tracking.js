import { TrackingModel } from "../schemas/tracking";

class Tracking {
    static createTracking({ user_id, date }) {
        return TrackingModel.create({ user_id, date });
    }

    static findByUserAndDate({ user_id, date }) {
        return TrackingModel.findOne({ user_id, date });
    }

    static findAll({ user_id }) {
        return TrackingModel.find({ user_id }).sort({ createdAt: 1 });
    }

    static updateTracking({ user_id, date }, { toUpdate }) {
        return TrackingModel.findOneAndUpdate({ user_id, date }, toUpdate, { new: true });
    }

    static delete({ id }) {
        return TrackingModel.deleteById(id);
    }
}

export { Tracking };
