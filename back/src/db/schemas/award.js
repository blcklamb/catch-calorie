import pkg from "mongoose";

const { Schema, model } = pkg;

const AwardSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    athlete: {
        type: Number,
        default: 0,
    },
    runner: {
        type: Number,
        default: 0,
    },
    // climber: {
    //     type: Number,
    //     default: 0,
    // },
    swimmer: {
        type: Number,
        default: 0,
    },
    gym_rat: {
        type: Number,
        default: 0,
    },
    // smasher: {
    //     type: Number,
    //     default: 0,
    // },
    triathlete: {
        type: Number,
        default: 0,
    },
    proteiner: {
        type: Number,
        default: 0,
    },
    // fruits_lover: {
    //     type: Number,
    //     default: 0,
    // },
    vegetables_lover: {
        type: Number,
        default: 0,
    },
    // yogurt_lover: {
    //     type: Number,
    //     default: 0,
    // },
    // meat_lover: {
    //     type: Number,
    //     default: 0,
    // },
    // candy_lover: {
    //     type: Number,
    //     default: 0,
    // },
    gourmand: {
        type: Number,
        default: 0,
    },
    visitor: {
        type: Number,
        default: 0,
    },
    steady: {
        type: Number,
        default: 0,
    },
});

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
