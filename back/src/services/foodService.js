import { Food } from "../db";

class foodService {
    static addFood({ category, name, kcal_per100g }) {
        const newFood = { category, name, kcal_per100g };
        return Food.create({ newFood });
    }

    static async getFood({ _id }) {
        const Food = await Food.findById({ _id });
        if (!Food) return { errorMessage: "음식를 찾을 수 없습니다." };

        return Food;
    }

    static getFoodAll({ search }) {
        return Food.findAll({ search });
    }

    static async setFood({ _id }, { toUpdate }) {
        const Food = await this.getFood({ _id });
        if (!Food) return { errorMessage: "음식를 찾을 수 없습니다." };

        const setFood = await Food.update({ id }, { toUpdate });
        return setFood;
    }

    static async deleteFood({ _id }) {
        const Food = await this.getFood({ _id });
        if (!Food) return { errorMessage: "음식를 찾을 수 없습니다." };

        const deleteFood = await Food.delete({ id });
        return deleteFood;
    }
}

export { foodService };
