import { Exercise } from "../db";


class exerService {
    static addExer({ name, kcal_per_lb, kcal_per_kg }) {
        return Exercise.create({ newExercise: { name, kcal_per_lb, kcal_per_kg }});
    }
    
    static async getExerByName({ name }) {
        const exer = await Exercise.findByName({ name })
        if (!exer) {
            const errorMessage = "Service: Cannot find this exercise. Search another name"
            return { errorMessage };
        }
        return exer;
    }

    static async getExerAll() {
        const exers = await Exercise.findAll();
        if (!exers) {
            const errorMessage = "Service: Cannot find all exercises.";
            return { errorMessage };
        }
        return exers;
    }

    static addExerViews({ id }) {
        return Exercise.update({ id }, { toUpdate: { $inc: { views: 1} }}, {new: true});
    }
}

export { exerService };