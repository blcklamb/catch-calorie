import { Exercise } from "../db";

class exerService {
    static addExer({ name, kcal_per_kg, kcal_per_lb }) {
        return Exercise.create({ newExercise: { name, kcal_per_kg, kcal_per_lb } });
    }

    static async getExerByName({ name }) {
        const exer = Exercise.findByName({ name });
        if (!exer) return { errorMessage: "Service: Cannot find this exercise. Search another name" };
        return exer;
    }

    static async getExerAll() {
        const exers = await Exercise.findAll();
        if (!exers) return { errorMessage: "Service: Cannot find all exercises." };
        return exers;
    }

    static addExerViews({ id }) {
        return Exercise.update({ id }, { toUpdate: { $inc: { views: 1 } } });
    }

    static async convertUnit({ kcal, unit }) {
        let kcal_per_lb = kcal;
        let kcal_per_kg = kcal;

        if (unit === "kilogram") {
            kcal_per_kg = kcal;
            kcal_per_lb = (kcal * 2.20462).toFixed(2);
        } else if (unit === "pound") {
            kcal_per_kg = (kcal * 0.453592).toFixed(2);
            kcal_per_lb = kcal;
        }

        return { kcal_per_kg, kcal_per_lb };
    }
}

export { exerService };
