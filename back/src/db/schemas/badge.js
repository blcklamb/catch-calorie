import { Schema, model } from "mongoose";

const BadgeSchema = new Schema({
    badge_name: {
        type: String,
        required: true,
    },
    award_name: {
        type: String,
    },
    level: {
        type: Number,
        required: true,
    },
    src: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const BadgeModel = model("Badge", BadgeSchema);

export { BadgeModel };
