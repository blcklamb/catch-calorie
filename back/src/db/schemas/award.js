import pkg from "mongoose";

const { Schema, model } = pkg;

const AwardSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    athlete: Number,
    runner: Number,
    climber: Number,
    swimmer: Number,
    gym_rat: Number,
    smasher: Number,
    triathlelte: Number,
    protainer: Number,
    fruits_lover: Number,
    vegetables_lover: Number,
    yogurt_lover: Number,
    meat_lover: Number,
    candy_lover: Number,
    gourmand: Number,
    visitor: Number,
});

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
