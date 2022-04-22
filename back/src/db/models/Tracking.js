import { TrackingModel } from "../schemas/tracking";

class Tracking {
    static createFoodTracking({ newTracking }) {
        return TrackingModel.create(newTracking);
    }

    static findById({ id }) {
        return TrackingModel.findById(id);
    }

    static findAll({ user_id }) {
        return TrackingModel.findOne({ _id: user_id }).sort({ createdAt: 1 });
    }

    static update({ id }, { toUpdate }) {
        return TrackingModel.findOneAndUpdate(id, toUpdate, { new: true });
    }

    static delete({ id }) {
        return TrackingModel.deleteById(id);
    }
}

export { Tracking };
