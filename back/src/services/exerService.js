import { Exercise } from "../db";

// 아직 미완성입니다.

class ExerService {
    static async addExer({ name, kcal_per_lb, kcal_per_kg }) {
        return Exercise.create({ newExercise: { name, kcal_per_lb, kcal_per_kg }});
    }
    
    static async getExer({ name }) {
        const exer = await Exercise.findByName({ name })
        if (!exer) {
            const errorMessage = "Cannot find this exercise. Search another name"
            return { errorMessage };
        }
        return exer;
    }
}

export { ExerService };