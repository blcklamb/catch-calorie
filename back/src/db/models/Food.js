import { FoodModel } from "../schemas/food";

class Food {
    static create({ newFood }) {
        return FoodModel.create(newFood);
    }

    static findByName({ name }) {
        return FoodModel.findOne({ name });
    }

    static findAll() {
        return FoodModel.find().sort({ views: -1 });
    }

    static update({ _id }, { toUpdate }) {
        return FoodModel.findOneAndUpdate({ _id }, toUpdate, { new: true });
    }

    static delete({ id }) {
        return FoodModel.deleteById(id);
    }
}

export { Food };
