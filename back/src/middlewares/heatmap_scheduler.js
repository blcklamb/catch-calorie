import { User, Heatmap } from "../db";

const heatmap_scheduler = async () => {
    const user = await User.findAll().then((data) => data.map((data) => data.name));
    console.log(user);
    const data = Heatmap.findByUser({ user_id });

    return Food.create({ newFood: { category, name, kcal_per100g } });
};

export default heatmap_scheduler;
