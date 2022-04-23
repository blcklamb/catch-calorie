import { Tracking, Food, Exercise } from "../db";
import { ExerciseModel } from "../db/schemas/exercise";

class trackingService {
    static async addFoodTracking({ user_id, data }) {
        const { food, gram } = data;

        const calorie = await Food.findByName({ name: food })
            .then((data) => data.kcal_per100g)
            .then((kcal_per_100g) => kcal_per_100g / 100)
            .then((kcal_per_1g) => kcal_per_1g * gram);

        const toUpdate = { $push: { food_record: { food: gram } }, $inc: { acc_cal: calorie } };

        switch (!(await Tracking.findByUserAndDate({ user_id, date: "2022-04-22T21:51:49.638+00:00" }))) {
            case true:
                await Tracking.createTracking({ user_id });
            default:
                return Tracking.updateTracking({ user_id, date: "2022-04-22T21:51:49.638+00:00" }, { toUpdate });
        }
        // new Date(new Date().setHours(0,0,0,0)).toISOString()
    }

    static async addExerTracking({ user_id, data }) {
        const { exer, hour } = data;

        const calorie = await ExerciseModel.findOne({ name: exer })
            .then((data) => data.kcal_per_kg) // kcal_per_kg
            .then((kcal_per_1kg) => kcal_per_1kg * 1000) // cal_per_kg
            .then((cal_per_1kg) => cal_per_1kg / 10) // cal_per_100g
            .then((cal_per_100g) => cal_per_100g * hour);

        const toUpdate = { $push: { exer_record: { data } }, $inc: { acc_cal: -calorie } };

        switch (!(await Tracking.findByUserAndDate({ user_id, date: "2022-04-22T21:51:49.638+00:00" }))) {
            case true:
                await Tracking.createTracking({ user_id });
            default:
                return Tracking.updateTracking({ user_id, date: "2022-04-22T21:51:49.638+00:00" }, { toUpdate });
        }
    }

    static async getTracking({ id }) {
        const tracking = await Tracking.findById({ id });
        if (!tracking) return { errorMessage: "음식를 찾을 수 없습니다." };

        return tracking;
    }

    static getTrackingAll({ user_id }) {
        return Tracking.findAll({ user_id });
    }

    static async setTracking({ id }, { toUpdate }) {
        const tracking = await this.getTracking({ _id });
        if (!tracking) return { errorMessage: "음식를 찾을 수 없습니다." };

        const setTracking = await Tracking.update({ id }, { toUpdate });
        return setTracking;
    }

    static async deleteTracking({ id }) {
        const tracking = await this.getTracking({ id });
        if (!tracking) return { errorMessage: "음식를 찾을 수 없습니다." };

        const deleteTracking = await Tracking.delete({ id });
        return deleteTracking;
    }

    static addTrackingViews({ id }) {
        return Tracking.update({ id }, { toUpdate: { $inc: { views: 1 } } }, { new: true });
    }
}

export { trackingService };
