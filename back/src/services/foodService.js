import { Food } from "../db";

class foodService {
    static addFood({ category, name, kcal_per100g }) {
        return Food.create({ newFood: { category, name, kcal_per100g } });
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
}

export { foodService };
