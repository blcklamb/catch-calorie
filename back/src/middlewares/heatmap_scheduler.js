import { User, Tracking, Heatmap } from "../db";
import dayjs from "dayjs";

const heatmap_scheduler = async () => {
    const users = await User.findAll();

    await Promise.all(
        users.map(async (user) => {
            const user_id = user._id;
            const day = dayjs().subtract(1, "day").format("YYYY-MM-DD");

            const data = await Heatmap.findByUser({ user_id });
            if (!data) await Heatmap.create({ user_id });

            const tracking = await Tracking.findByUserAndDate({ user_id, day });
            if (tracking) {
                // 권장 kcal - (acc_cal: 섭취 kcal - 소모 kcal)
                const value = tracking.rec_cal - tracking.acc_cal;
                const toUpdate = { $push: { record: { value, day } } };
                await Heatmap.update({ user_id }, { toUpdate });
            }
        }),
    );

    console.log("✅ Heatmap update completed!");
};

export default heatmap_scheduler;
