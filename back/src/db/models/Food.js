import { FoodModel } from "../schemas/food";

class Food {
    static create({ newFood }) {
        return FoodModel.create(newFood);
    }

    static findById({ _id }) {
        return FoodModel.findById({ _id });
    }

    static findAll({ search }) {
        return FoodModel.find({ name: { $regex: new RegExp(`${search}`, "i") } });
    }

    static updateOne({ _id }, { toUpdate }) {
        return FoodModel.findOneAndUpdate(_id, toUpdate, { new: true });
    }

    static delete({ _id }) {
        return FoodModel.deleteById({ _id });
    }
}

export { Food };
