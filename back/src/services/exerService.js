import { Exercise } from "../db";


class exerService {
    static addExer({ name, kcal_per_kg, kcal_per_lb }) {
        return Exercise.create({ newExercise: { name, kcal_per_kg, kcal_per_lb }});
    }
    
    static async getExerByName({ name }) {
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

    static async convertUnit({ kcal, unit }) {
        console.log('service', kcal, unit)
        let kcal_per_lb = kcal;
        let kcal_per_kg = kcal;
        if (unit==='kilogram') {
            
            kcal_per_kg = kcal;
            kcal_per_lb = Math.round(kcal*2.20462*10)/10;
        } else if (unit==='pound') {
            
            kcal_per_kg = Math.round(kcal*0.453592*10)/10;
            kcal_per_lb = kcal;
        } 
        return {  kcal_per_kg, kcal_per_lb,}
    }
}

export { exerService };