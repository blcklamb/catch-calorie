import mongoose from "mongoose";

import { User } from "./models/User";
import { Food } from "./models/Food";
import { Exercise } from "./models/Exercise";
import { Tracking } from "./models/Tracking";
import { Heatmap } from "./models/Heatmap";
import { Award } from "./models/Award";

const DB_URL = process.env.MONGODB_URL || "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.";

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.once("open", async () => {
    const trackings = db.collection("trackings");
    const changeStream = trackings.watch();

    changeStream.on("change", async (change) => {
        const terms = async ({ user_id, trackings }) => {
            const foods = trackings.map((tracking) => tracking.food_record).flat();
            const exers = trackings.map((tracking) => tracking.exer_record).flat();

            // ------------ EXERCISE COUNTING ------------

            // athlete: 운동 5n회 이상 (I, II, III, IV, V, VI)
            const athlete = Math.floor(exers.length / 5);
            if (athlete >= 6) await Award.update({ user_id }, { athlete: 6 });
            else await Award.update({ user_id }, { athlete });

            // runner: 런닝 5n회 이상 (I, II, III)
            const runner = Math.floor(exers.filter((exer) => exer.name === "Running").length / 5);
            if (runner >= 3) await Award.update({ user_id }, { runner: 3 });
            else await Award.update({ user_id }, { runner });

            // climber: 등산 5n회 이상 (I, II, III)
            const climber = Math.floor(exers.filter((exer) => exer.name === "climbing").length / 5);
            if (climber >= 3) await Award.update({ user_id }, { climber: 3 });
            else await Award.update({ user_id }, { climber });

            // swimmer: 수영 5n회 이상 (I, II, III)
            const swimmer = Math.floor(exers.filter((exer) => exer.name === "Swimming").length / 5);
            if (swimmer >= 3) await Award.update({ user_id }, { swimmer: 3 });
            else await Award.update({ user_id }, { swimmer });

            // gym_rat: 웨이트 5n회 이상 (I, II, III)
            const gym_rat = Math.floor(exers.filter((exer) => exer.name === "Weighting").length / 5);
            if (gym_rat >= 3) await Award.update({ user_id }, { gym_rat: 3 });
            else await Award.update({ user_id }, { gym_rat });

            // smasher: 배드민턴 5n회 이상 (I, II, III)
            const smasher = Math.floor(exers.filter((exer) => exer.name === "Weighting").length / 5);
            if (smasher >= 3) await Award.update({ user_id }, { smasher: 3 });
            else await Award.update({ user_id }, { smasher });

            // triathlelte: 사이클, 러닝, 수영 각 1회 이상 (I)
            const cycle = exers.filter((exer) => exer.name === "Cycling").length > 0;
            const run = exers.filter((exer) => exer.name === "Running").length > 0;
            const swim = exers.filter((exer) => exer.name === "Swimming").length > 0;
            const triathlelte = cycle && run && swim;
            if (triathlelte) await Award.update({ user_id }, { triathlelte: 1 });

            // -------------- FOOD COUNTING --------------

            // protainer: 프로틴 쉐이크 섭취 5n회 이상 (I, II, III)
            const protainer = Math.floor(foods.filter((food) => food.name === "Weighting").length / 5);
            if (protainer >= 3) await Award.update({ user_id }, { protainer: 3 });
            else await Award.update({ user_id }, { protainer });

            // fruits_lover: 과일 섭취 5n회 이상 (I, II, III)
            const fruits_lover = Math.floor(foods.filter((food) => food.category === "Fruits").length / 5);
            if (fruits_lover >= 3) await Award.update({ user_id }, { fruits_lover: 3 });
            else await Award.update({ user_id }, { fruits_lover });

            // vegetables_lover: 채소 섭취 5n회 이상 (I, II, III)
            const vegetables_lover = Math.floor(foods.filter((food) => food.category === "Vegetables").length / 5);
            if (vegetables_lover >= 3) await Award.update({ user_id }, { vegetables_lover: 3 });
            else await Award.update({ user_id }, { vegetables_lover });

            // yogurt_lover: 요거트 섭취 5n회 이상 (I, II, III)
            const yogurt_lover = Math.floor(foods.filter((food) => food.category === "Yogurt").length / 5);
            if (yogurt_lover >= 3) await Award.update({ user_id }, { yogurt_lover: 3 });
            else await Award.update({ user_id }, { yogurt_lover });

            // meat_lover: 고기 섭취 5n회 이상 (I, II, III)
            const meat_lover = Math.floor(foods.filter((food) => food.category === "Meat").length / 5);
            if (meat_lover >= 3) await Award.update({ user_id }, { meat_lover: 3 });
            else await Award.update({ user_id }, { meat_lover });

            // candy_lover: 사탕 섭취 5n회 이상 (I, II, III)
            const candy_lover = Math.floor(foods.filter((food) => food.category === "Candy&Sweets").length / 5);
            if (candy_lover >= 3) await Award.update({ user_id }, { candy_lover: 3 });
            else await Award.update({ user_id }, { candy_lover });

            // gourmand: 총 섭취 칼로리 20000n kcal 이상 (I, II, III)
            const gourmand = Math.floor(foods.reduce((acc, cur) => acc + cur.calorie, 0) / 20000);
            if (gourmand >= 3) await Award.update({ user_id }, { gourmand: 3 });
            else await Award.update({ user_id }, { gourmand });

            // ------------- OTHER COUNTING --------------

            // visitor: 출석 5n회 이상 (I, II, III, IV, V, VI)
            const visitor = Math.floor(trackings.length / 5);
            if (visitor >= 6) await Award.update({ user_id }, { visitor: 6 });
            else await Award.update({ user_id }, { visitor });
        };

        if (change.operationType === "update") {
            const id = change.documentKey._id;
            const { user_id } = await Tracking.findById({ id });
            const trackings = await Tracking.findByUser({ user_id });

            if (!(await Award.findByUser({ user_id }))) await Award.create({ user_id });

            return terms({ user_id, trackings });
        }
    });
});

db.on("connected", () => console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL));
db.on("error", (error) => console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error));

export { User, Food, Tracking, Exercise, Heatmap };
