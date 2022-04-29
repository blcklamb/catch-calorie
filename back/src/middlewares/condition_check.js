import { User, Tracking, Award } from "../db";


// beginner-운동 5회 이상
const athlete = async (req, res, next) => {
    const user_id = req.currentUserId;
    const exerciseCount = await Tracking.findByUser({ user_id })
        .then((data) => {
            let count = 0;
            let sum = 0
            count = data.map(daily_rec => daily_rec.exer_record.length)
            count.forEach(item => {
                sum += item
            })
            return sum
        })
    console.log('exerciseCount', exerciseCount)
    if ( 4 <= exerciseCount && exerciseCount< 9 ) {
        console.log('athlete 1 complete UR beginner')
    } else if ( 9 <= exerciseCount && exerciseCount < 14 ) {
        console.log('athlete 2 complete UR newcomer')
    } else if ( 14 <= exerciseCount && exerciseCount < 19 ) {
        console.log('athlete 3 complete UR rookie_1')
    } else if ( 19 <= exerciseCount && exerciseCount < 24) {
        console.log('athlete 4 complete UR rookie_2')
    } else if ( 24 <= exerciseCount && exerciseCount < 29 ) {
        console.log('athlete 5 complete UR expert')
    } else if ( 29 <= exerciseCount ) {
        console.log('athlete 6 complete UR master')
    }
    next()
}

const runner = async (req, res, next) => {
    const user_id = req.currentUserId;
    const runningCount = await Tracking.findByUser({ user_id })
        .then((data) => {
            let sum = 0
            let dataList = data.map(daily_rec => daily_rec.exer_record)
                .map(daily_rec=>daily_rec
                .filter(cond01 =>cond01.name==='Running'))
                .flat()
            sum = dataList.length
            return sum
        })
    console.log('runningCount', runningCount)
    if ( 4 <= runningCount && runningCount < 9 ) {
        console.log('runner 1 complete UR warm_up')
    } else if ( 9 <= runningCount && runningCount < 14 ) {
        console.log('runner 2 complete UR streaker')
    } else if ( 14 <= runningCount ) {
        console.log('runner 3 complete UR chaser')
    } 
    next()
}

export { athlete, runner };