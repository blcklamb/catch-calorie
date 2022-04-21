import { Calories } from "../db";

class calorieService{
    // 칼로리 추가하기
    static addCalorie = async ({ user_id, intake, burned }) => {
        const newCalories = { user_id, intake, burned };
        const createdNewCalories = await Calories.create({ newCalories })
        createdNewCalories.errorMessage = null

        return createdNewCalories;
    }

    // 칼로리 정보 가져오기
    static getCalorie = async ({ user_id }) =>{
        const calories = await Calories.findByUserId({ user_id });
        
        const intake = calories.intake;
        const burned = calories.burned;

        const clickedCalories = {
            intake,
            burned,
        };

        return clickedCalories
    }

    // 칼로리 정보 수정하기
    static setCalorie = async ({ _id, toUpdate }) => {
        let calories = await Calories.find({ _id });

        if (!calories){
            const errorMessage = "칼로리 정보가 없습니다."
            return { errorMessage }
        }

        if(toUpdate.intake){
            const fieldToUpdate = "intake";
            const newValue = toUpdate.intake;
            calories = await Calories.update({ _id, fieldToUpdate, newValue })
        }

        if(toUpdate.burned){
            const fieldToUpdate = "burned";
            const newValue = toUpdate.burned;
            calories = await Calories.update({ _id, fieldToUpdate, newValue })
        }

        return calories;
    }

    // 칼로리 정보 삭제하기
    static deleteCalorie = async({ _id }) => {
        const calories = await Calories.delete({ _id });
        return calories;
    }
};

export { calorieService };