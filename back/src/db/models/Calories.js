import { CalorieModel } from "../schemas/calories";

class Calories {
    static async create({ newCalories }){
        const createdNewCalories = await CalorieModel.create(newCalories);
        return createdNewCalories
    }

    static async find({ _id }){
        const calories = await CalorieModel.find({ _id });
        return calories
    }

    static async findByUserId({ userId }){
        const calories = await CalorieModel.find({ userId });
        return calories
    }

    static async update({ _id, fieldToUpdate, newValue }) {
        const filter = { _id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedCalorie = await CalorieModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedCalorie;
    };

}

export { Calories };