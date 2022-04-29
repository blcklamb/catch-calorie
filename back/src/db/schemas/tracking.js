import { Schema, model } from "mongoose";

const TrackingSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: {
            type: String,
            required: true,
            immutable: true,
        },
        rec_cal: {
            type: Number,
            required: true,
        },
        food_record: {
            type: Array,
            required: true,
            default: [],
        },
        exer_record: {
            type: Array,
            required: true,
            default: [],
        },
        acc_cal: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);

const TrackingModel = model("Tracking", TrackingSchema);

export { TrackingModel };
