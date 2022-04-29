import { ExerModel } from "../schemas/exercise";

class Exercise {
    static create({ newExercise }) {
        return ExerModel.create(newExercise);
    }

    static findByName({ name }) {
        return ExerModel.findOne({ name });
    }

    static findAll() {
        return ExerModel.find().sort({ views: -1 });
    }

    static update({ id, toUpdate }) {
        return ExerModel.findByIdAndUpdate(id, toUpdate, { new: true });
    }

    static delete({ id }) {
        return ExerModel.deleteById(id);
    }
}

export { Exercise };
