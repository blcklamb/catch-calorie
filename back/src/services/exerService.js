import { Exercise } from "../db";


class exerService {
    static addExer({ name, kcal_per_lb, kcal_per_kg }) {
        return Exercise.create({ newExercise: { name, kcal_per_lb, kcal_per_kg }});
    }
    
    static async getExerByName({ name }) {
        console.log(name)
        const exer = Exercise.findByName({ name })
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
        return Exercise.update({ _id:id }, { toUpdate: { $inc: { views: 1} }}, {new: true});
    }

    static async convertUnit({ weight, unit }) {
        console.log('service', weight, unit)
        let kcal_per_lb = weight;
        let kcal_per_kg = weight;
        if (unit==='kilogram') {
            
            kcal_per_kg = weight;
            kcal_per_lb = Math.round(weight*2.20462*10)/10;
        } else if (unit==='pound') {
            
            kcal_per_kg = Math.round(weight*0.453592*10)/10;
            kcal_per_lb = weight;
        } 
        Math.round(1.222 * 10)
        return { kcal_per_lb, kcal_per_kg }
    }
}

export { exerService };