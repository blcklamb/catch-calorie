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

    static findByNameReturnCategory({ name }) {
        return this.findByName({ name }).then((data) => data.category);
    }

    static update({ id, toUpdate }) {
        return FoodModel.findByIdAndUpdate(id, toUpdate, { new: true });
    }

    static delete({ id }) {
        return FoodModel.deleteById(id);
    }
}

export { Food };
