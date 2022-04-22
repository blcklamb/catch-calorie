import { Tracking, Food } from "../db";

class trackingService {
    static async addFoodTracking({ data }) {
        let newTracking = [];

        data.map(async (data) => {
            const calorie = await Food.findByName({ name: data.name }).then((data) => data.kcal_per100g);
            newTracking.push({ name: data.name, calorie: Math.round((calorie / 100) * data.gram) });
            console.log(newTracking);
        });
        await console.log(newTracking);
        return Tracking.createFoodTracking({ newTracking });
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
