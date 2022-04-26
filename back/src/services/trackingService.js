import { Tracking, Food, Exercise, User } from "../db";
import { v4 as uuid } from "uuid";
import { ExerModel } from "../db/schemas/exercise"; // git merge 이후 삭제되어야 함.

class trackingService {
    static async addTracking({ user_id, date }) {
        const user = await User.findById({ user_id });
        const bmi = user.weight / (user.height / 100) ** 2;
        const rec_cal = (user.height / 100) ** 2 * bmi * 35;
        return Tracking.create({ user_id, date, rec_cal });
    }

    static async addFoodTracking({ user_id, date, name, gram }) {
        const calorie = await Food.findByName({ name: food })
            .then((data) => data.kcal_per100g) //kcal_per_100g
            .then((cal_per_100g) => cal_per_100g / 100) //kcal_per_g
            .then((cal_per_1g) => cal_per_1g * gram);

        const toUpdate = {
            $push: { food_record: { id: uuid(), food, name, calorie } },
            $inc: { acc_cal: calorie },
        };

        const isTrackingExist = await Tracking.findByUserAndDate({ user_id, date });
        if (!isTrackingExist) await this.addTracking({ user_id, date });

        return Tracking.update({ user_id, date }, { toUpdate });
    }

    static async addExerTracking({ user_id, date, name, minute }) {
        const weight = (await User.findById({ user_id }).weight) || 60;

        const { kcal_per_kg } = await ExerModel.findOne({ name });
        const calorie = ((kcal_per_kg * weight) / 60) * minute;

        const toUpdate = {
            $push: { exer_record: { id: uuid(), name, minute, calorie } },
            $inc: { acc_cal: -calorie },
        };

        const isTrackingExist = await Tracking.findByUserAndDate({ user_id, date });
        if (!isTrackingExist) await this.addTracking({ user_id, date });

        return Tracking.update({ user_id, date }, { toUpdate });
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

        const toUpdate = {
            $pull: { food_record: food },
            $inc: { acc_cal: -food.calorie },
        };

        return Tracking.update({ user_id, date }, { toUpdate });
    }

    static async deleteExerTracking({ id }) {
        const data = await Tracking.findByRecordId({ id }, { record: "exer" });
        const { user_id, date, exer_record } = data;
        const exer = exer_record.find((exer) => exer.id === id);

        const toUpdate = {
            $pull: { exer_record: exer },
            $inc: { acc_cal: exer.calorie },
        };

        return Tracking.update({ user_id, date }, { toUpdate });
    }
}

export { trackingService };
