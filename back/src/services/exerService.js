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
        return Exercise.update({ id }, { toUpdate: { $inc: { views: 1 } } }, { new: true });
    }

    static async convertUnit({ weight, unit }) {
        let kcal_per_lb = weight;
        let kcal_per_kg = weight;

        if (unit === "kilogram") {
            kcal_per_kg = weight;
            kcal_per_lb = Math.round(weight * 2.20462 * 10) / 10;
        } else if (unit === "pound") {
            kcal_per_kg = Math.round(weight * 0.453592 * 10) / 10;
            kcal_per_lb = weight;
        }

        return { kcal_per_kg, kcal_per_lb };
    }
}

export { exerService };
