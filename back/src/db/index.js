import mongoose from "mongoose";

import { User } from "./models/User";
import { Food } from "./models/Food";
import { Exercise } from "./models/Exercise";
import { Tracking } from "./models/Tracking";
import { Heatmap } from "./models/Heatmap";

const DB_URL = process.env.MONGODB_URL || "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.";

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.once("open", async () => {
    const trackings = db.collection("trackings");
    const changeStream = trackings.watch();

    changeStream.on("change", async (change) => {
        const terms = (trackings) => {};

        switch (change.operationType) {
            case "insert":
                break;

            case "update":
                const id = change.documentKey._id;
                const { user_id } = await Tracking.findById({ id });
                const trackings = await Tracking.findByUser({ user_id });
                console.log(trackings);
                terms(trackings);
        }
    });
});

db.on("connected", () => console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL));
db.on("error", (error) => console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error));

export { User, Food, Tracking, Exercise, Heatmap };
