import pkg from "mongoose";

const { Schema, model } = pkg;

const AwardSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    achieved_award: {
        type: Array,
        required: true,
        default: [],
    },
});

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
