import pkg from 'mongoose'
const { Schema, model } = pkg;

const CalorieSchema = new Schema(
    {
        user_id:{
            type: String,
            required: true,
        },
        intake: {   // 섭취 칼로리
            type: String,
            required: false,
        },
        burned:{    // 소비 칼로리
            type: String,
            required: false,
        }
        
    }
);

const CalorieModel = model("Food", CalorieSchema);

export { CalorieModel };