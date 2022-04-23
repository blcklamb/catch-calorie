import { Schema, model } from "mongoose";

const TrackingSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        food_record: {
            type: Array,
        },
        exer_record: {
            type: Array,
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
