import { Badge } from "../db";

class badgeService {
    static getBadges() {
        return Badge.findAll();
    }
}

export { badgeService };
