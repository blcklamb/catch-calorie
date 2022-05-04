import { Tracking, Food, Exercise, User } from "../db";
import { v4 as uuid } from "uuid";

class trackingService {
    static async addTracking({ user_id, date }) {
        const user = await User.findById({ id: user_id });
        const bmi = user.weight / (user.height / 100) ** 2;
        const rec_cal = Math.floor((user.height / 100) ** 2 * bmi * 35);

        return Tracking.create({ user_id, date, rec_cal });
    }

    static async addFoodTracking({ user_id, date, name, gram }) {
        const { kcal_per_100g } = await Food.findByName({ name });
        const kcal_per_1g = kcal_per_100g / 100;
        const calorie = kcal_per_1g * gram;

        const toUpdate = {
            $push: { food_record: { id: uuid(), name, gram, calorie } },
            $inc: { acc_cal: calorie },
        };

        const isTrackingExist = await Tracking.findByUserAndDate({ user_id, date });
        if (!isTrackingExist) await this.addTracking({ user_id, date });

        return Tracking.update({ user_id, date, toUpdate });
    }

    static async addExerTracking({ user_id, date, name, minute }) {
        const { weight } = await User.findById({ id: user_id });
        const { kcal_per_kg } = await Exercise.findByName({ name });
        const calorie = Math.floor(((kcal_per_kg * weight) / 60) * minute);

        const toUpdate = {
            $push: { exer_record: { id: uuid(), name, minute, calorie } },
            $inc: { acc_cal: -calorie },
        };

        const isTrackingExist = await Tracking.findByUserAndDate({ user_id, date });
        if (!isTrackingExist) await this.addTracking({ user_id, date });

        return Tracking.update({ user_id, date, toUpdate });
    }

    static getTrackingByUserAndDate({ user_id, date }) {
        return Tracking.findByUserAndDate({ user_id, date });
    }

    static getTrackingByUser({ user_id }) {
        return Tracking.findByUser({ user_id });
    }

    static async setFoodTracking({ id, gram }) {
        const data = await Tracking.findByRecordId({ id, record: "food" });
        const { user_id, date, food_record } = data;
        const { name } = food_record.find((food) => food.id === id);

        await this.deleteFoodTracking({ id });

        return this.addFoodTracking({ user_id, date, name, gram });
    }

    static async setExerTracking({ id, minute }) {
        const data = await Tracking.findByRecordId({ id, record: "exer" });
        const { user_id, date, exer_record } = data;
        const { name } = exer_record.find((exer) => exer.id === id);

        await this.deleteExerTracking({ id });

        return this.addExerTracking({ user_id, date, name, minute });
    }

    static async deleteFoodTracking({ id }) {
        const data = await Tracking.findByRecordId({ id, record: "food" });
        const { user_id, date, food_record } = data;
        const food = food_record.find((food) => food.id === id);

        const toUpdate = {
            $pull: { food_record: food },
            $inc: { acc_cal: -food.calorie },
        };

        return Tracking.update({ user_id, date, toUpdate });
    }

    static async deleteExerTracking({ id }) {
        const data = await Tracking.findByRecordId({ id, record: "exer" });
        const { user_id, date, exer_record } = data;
        const exer = exer_record.find((exer) => exer.id === id);

        const toUpdate = {
            $pull: { exer_record: exer },
            $inc: { acc_cal: exer.calorie },
        };

        return Tracking.update({ user_id, date, toUpdate });
    }
}

export { trackingService };
