import { Schema, model } from "mongoose";

const ExerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    kcal_per_lb: {
        type: Number,
        required: true,
    },
    kcal_per_kg: {
        type: Number,
        required: true,
    },
});

const ExerModel = model("Exercise", ExerSchema);

export { ExerModel };
