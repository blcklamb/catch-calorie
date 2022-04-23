import { v4 as uuid } from "uuid";
import { Tracking, Food, Exercise, User } from "../db";
import { ExerciseModel } from "../db/schemas/exercise";

class trackingService {
    static async addFoodTracking({ user_id, date, food, gram }) {
        const calorie = await Food.findByName({ name: food })
            .then((data) => data.kcal_per100g) //kcal_per_100g
            .then((cal_per_100g) => cal_per_100g / 100) //kcal_per_g
            .then((cal_per_1g) => cal_per_1g * gram);

        const toUpdate = { $push: { food_record: { id: uuid(), food, gram, calorie } }, $inc: { acc_cal: calorie } };

        switch (!(await Tracking.findByUserAndDate({ user_id, date }))) {
            case true:
                await Tracking.createTracking({ user_id, date });
            default:
                return Tracking.updateTracking({ user_id, date }, { toUpdate });
        }
    }

    static async addExerTracking({ user_id, date, exer, hour }) {
        const weight = (await User.findById({ user_id }).weight) || 60;

        const calorie = await ExerciseModel.findOne({ name: exer })
            .then((data) => data.kcal_per_kg) // kcal_per_kg
            .then((kcal_per_1kg) => kcal_per_1kg * weight) // kcal_per_user
            .then((kcal_per_user) => Math.round(kcal_per_user * hour));

        const toUpdate = { $push: { exer_record: { id: uuid(), exer, hour, calorie } }, $inc: { acc_cal: -calorie } };

        switch (!(await Tracking.findByUserAndDate({ user_id, date }))) {
            case true:
                await Tracking.createTracking({ user_id, date });
            default:
                return Tracking.updateTracking({ user_id, date }, { toUpdate });
        }
    }

    static getTrackingByUserAndDate({ user_id, date }) {
        return Tracking.findByUserAndDate({ user_id, date });
    }

    static getTrackingByUser({ user_id }) {
        return Tracking.findAll({ user_id });
    }

    static async deleteFoodTracking({ id }) {
        const data = await Tracking.findByRecordId({ id }, { record: "food" });
        const { user_id, date, food_record } = data;
        const food = food_record.find((food) => food.id === id);

        const toUpdate = { $pull: { food_record: food }, $inc: { acc_cal: -food.calorie } };

        return Tracking.updateTracking({ user_id, date }, { toUpdate });
    }

    static async deleteExerTracking({ id }) {
        const tracking = await this.getTracking({ id });
        if (!tracking) return { errorMessage: "음식를 찾을 수 없습니다." };

        const deleteTracking = await Tracking.delete({ id });
        return deleteTracking;
    }
}

export { trackingService };
