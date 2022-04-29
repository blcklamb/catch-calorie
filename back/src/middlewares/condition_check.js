// 만들다가 필요없다는 것을 깨달아서 아쉬운 코드....
import { User, Tracking, Award } from "../db";

// athlete-운동 5회, 10회, 15회, 20회, 25회, 30회 이상
const athlete = async (req, res, next) => {
    const user_id = req.currentUserId;
    const exerciseCount = await Tracking.findByUser({ user_id }).then((data) => {
        let count = 0;
        let sum = 0;
        count = data.map((daily_rec) => daily_rec.exer_record.length);
        count.forEach((item) => {
            sum += item;
        });
        return sum;
    });
    console.log("exerciseCount", exerciseCount);
    if (4 <= exerciseCount && exerciseCount < 9) {
        console.log("athlete 1 complete UR beginner");
    } else if (9 <= exerciseCount && exerciseCount < 14) {
        console.log("athlete 2 complete UR newcomer");
    } else if (14 <= exerciseCount && exerciseCount < 19) {
        console.log("athlete 3 complete UR rookie_1");
    } else if (19 <= exerciseCount && exerciseCount < 24) {
        console.log("athlete 4 complete UR rookie_2");
    } else if (24 <= exerciseCount && exerciseCount < 29) {
        console.log("athlete 5 complete UR expert");
    } else if (29 <= exerciseCount) {
        console.log("athlete 6 complete UR master");
    }
    next();
};

// runner-'Running' 5회, 10회, 15회 이상
const runner = async (req, res, next) => {
    const user_id = req.currentUserId;
    const runningCount = await Tracking.findByUser({ user_id }).then((data) => {
        let dataList = data
            .map((daily_rec) => daily_rec.exer_record)
            .flat()
            .filter((item) => item.name === "Running");
        return dataList.length;
    });
    console.log("runningCount", runningCount);
    const { name } = req.body;
    if (name === "Running") {
        if (4 <= runningCount && runningCount < 9) {
            console.log("runner 1 complete UR warm_up");
        } else if (9 <= runningCount && runningCount < 14) {
            console.log("runner 2 complete UR streaker");
        } else if (14 <= runningCount) {
            console.log("runner 3 complete UR chaser");
        }
        next();
    } else {
        next();
    }
};

// gym_rat-'Weight' 5회, 10회, 15회 이상
const gym_rat = async (req, res, next) => {
    const user_id = req.currentUserId;
    const weightCount = await Tracking.findByUser({ user_id }).then((data) => {
        let dataList = data
            .map((daily_rec) => daily_rec.exer_record)
            .flat()
            .filter((rec) => rec.name.includes("Weight"));
        return dataList.length;
    });
    console.log("weightCount", weightCount);
    const { name } = req.body;
    if (name.includes("Weight")) {
        if (4 <= weightCount && weightCount < 9) {
            console.log("gym_rat 1 complete UR yo_ho");
        } else if (9 <= weightCount && weightCount < 14) {
            console.log("gym_rat 2 complete UR heave_ho");
        } else if (14 <= weightCount) {
            console.log("gym_rat 3 complete UR alley_oop");
        }
    } else {
        next();
    }
};

const vegetables_lover = async (req, res, next) => {
    const user_id = req.currentUserId;
    const vegeCount = await Tracking.findByUser({ user_id }).then((data) => {
        console.log(data);
        let dataList = data
            .map((daily_rec) => daily_rec.food_record)
            .flat()
            .filter((rec) => rec.category === "Vegetables");
        return dataList.length;
    });
    console.log("vegeCount", vegeCount);
    const { name } = req.body;
    if (name.includes("vege")) {
        if (4 <= vegeCount && vegeCount < 9) {
            console.log("vegetables_lover 1 complete UR rabbit");
        } else if (9 <= vegeCount && vegeCount < 14) {
            console.log("vegetables_lover 2 complete UR deer");
        } else if (14 <= vegeCount) {
            console.log("vegetables_lover 3 complete UR panda");
        }
    } else {
        next();
    }
};

// 37번째 줄 climbing
// 47번째 줄 weight 로 찾기
// 52번째 줄 badminton 오타
// 57번째 줄 cycling
// 66번째 줄 protein

export { athlete, runner, gym_rat, vegetables_lover };
