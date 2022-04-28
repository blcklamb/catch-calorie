import { Heatmap } from "../db";

class heatmapService {
    static getHeatmap({ user_id }) {
        return Heatmap.findByUser({ user_id });
    }
}

export { heatmapService };
