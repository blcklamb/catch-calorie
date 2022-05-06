import { Food } from "../db";

class foodService {
    static addFood({ category, name, kcal_per_100g, kcal_per_lb }) {
        return Food.create({ newFood: { category, name, kcal_per_100g, kcal_per_lb } });
    }

    static getFoodByName({ name }) {
        return Food.findByName({ name });
    }

    static getFoodAll() {
        return Food.findAll();
    }

    static setfood({ id, toUpdate }) {
        return Food.update({ id, toUpdate });
    }

    static deleteFood({ id }) {
        return Food.delete({ id });
    }

    static addFoodViews({ id }) {
        return Food.update({ id, toUpdate: { $inc: { views: 1 } } }, { new: true });
    }

    static async convertUnit({kcal, unit}) {
        let kcal_per_lb = kcal;
        let kcal_per_100g = kcal;

        if (unit === "gram") {
            kcal_per_100g = kcal;
            kcal_per_lb = (kcal * 0.220462).toFixed(2);
        } else if (unit === "pound") {
            kcal_per_100g = (kcal / 0.220462).toFixed(2);
            kcal_per_lb = kcal;
        }

        return { kcal_per_100g, kcal_per_lb };
    }

}

export { foodService };
