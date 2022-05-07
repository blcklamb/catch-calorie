import { BadgeModel } from "../schemas/badge";

class Badge {
    static findAll() {
        return BadgeModel.find();
    }
}

export { Badge };
