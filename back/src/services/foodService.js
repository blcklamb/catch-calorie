import { Food } from "../db";

class foodService {
    static addFood({ category, name, kcal_per100g }) {
        return Food.create({ newFood: { category, name, kcal_per100g } });
    }

    static getFood({ id }) {
        return Food.findById({ id });
    }

    static getFoodAll({ search }) {
        return Food.findAll({ search });
    }

    static setfood({ id }, { toUpdate }) {
        return Food.update({ id }, { toUpdate });
    }

    static deleteFood({ id }) {
        return Food.delete({ id });
    }

    static addFoodViews({ id }) {
        return Food.update({ id }, { toUpdate: { $inc: { views: 1 } } }, { new: true });
    }
}

export { foodService };
