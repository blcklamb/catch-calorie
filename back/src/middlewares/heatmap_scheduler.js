import { Heatmap, Tracking, User } from "../db";
import dayjs from "dayjs";

const heatmap_scheduler = async () => {
    try {
        const users = await User.findAll();
        await Promise.all(
            users.map(async (user) => {
                const user_id = user._id;
                const day = dayjs().add(9, "hour").subtract(1, "day").format("YYYY-MM-DD");

                const data = await Heatmap.findByUser({ user_id });
                if (!data) await Heatmap.create({ user_id });

                const tracking = await Tracking.findByUserAndDate({ user_id, day });
                if (tracking) {
                    // 권장 kcal - (acc_cal: 섭취 kcal - 소모 kcal)
                    const value = tracking.rec_cal - tracking.acc_cal;
                    if (value >= 0) {
                        const toUpdate = { $push: { record: { value, day } } };
                        await Heatmap.update({ user_id, toUpdate });
                    }
                }
            }),
        );
        console.log("✅ Heatmap update completed!");
    } catch (error) {
        console.log("❌ Heatmap update error!");
    }
};

export default heatmap_scheduler;
