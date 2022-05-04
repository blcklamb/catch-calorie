import { HeatmapModel } from "../schemas/heatmap";

class Heatmap {
    static create({ user_id }) {
        return HeatmapModel.create({ user_id });
    }

    static findByUser({ user_id }) {
        return HeatmapModel.find({ user_id });
    }

    static update({ user_id, toUpdate }) {
        return HeatmapModel.findOneAndUpdate({ user_id }, toUpdate, { new: true });
    }

    static delete({ user_id }) {
        return HeatmapModel.findByIdAndDelete({ user_id });
    }
}

export { Heatmap };
