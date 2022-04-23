import { ExerModel } from "../schemas/exercise"

class Exercise {
    static create({ newExercise }) {
        return ExerModel.create(newExercise);
    }

    static findByName({ name }) {
        return ExerModel.findOne({ name });
    }

    static findAll({ search }) {
        return ExerModel.find({ name: { search }})
    }
}

export { Exercise };