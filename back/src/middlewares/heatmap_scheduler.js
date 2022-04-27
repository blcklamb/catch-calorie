import { User, Tracking, Heatmap } from "../db";
import dayjs from "dayjs";

const heatmap_scheduler = async () => {
    const user = await User.findAll();

    user.map(async (user) => {
        const user_id = user._id;
        const date = dayjs().subtract(1, "day").format("YYYY-MM-DD");

        const data = await Heatmap.findByUser({ user_id });
        if (data.length === 0) await Heatmap.create({ user_id });

        const value = await Tracking.findByUserAndDate({ user_id, date });
        if (value) {
            const toUpdate = {
                $push: { record: { value: value.acc_cal, date } },
            };
            await Heatmap.update({ user_id }, { toUpdate });
        }
    });

    console.log("✅ Heatmap update completed!");
};

export default heatmap_scheduler;
