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

    static async findByNameReturnCategory({name, spare_category}) {
        const food = await FoodModel.findOne({ name });
        console.log('name', name, spare_category, 'compare', food.category === spare_category)
        return food.category === spare_category;
    }

    static update({ id, toUpdate }) {
        return FoodModel.findByIdAndUpdate(id, toUpdate, { new: true });
    }

    static delete({ id }) {
        return FoodModel.deleteById(id);
    }
}

export { Food };
