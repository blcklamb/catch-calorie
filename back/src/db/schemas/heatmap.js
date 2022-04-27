import pkg from "mongoose";

const { Schema, model } = pkg;

const HeatmapSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    record: {
        type: Array,
        required: true,
        default: [],
    },
});

const HeatmapModel = model("Heatmap", HeatmapSchema);

export { HeatmapModel };
