const express = require('express')
const app = express()
const port = 3000
const router = express.Router();

// config.js에서 export한 모듈을 다음과 같이 import 시킬 수 있다. (같은 디렉토리 위치)
const database = require('./config');

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const databaseRef = database.ref('users');

// 달력
app.get('/calender', function (req, res) {

    databaseRef.once('value').then((snapshot) => {
        const data = snapshot.val();
        return res.status(500).json(data);
    });
});

/* 
    이미지 업로드할경우 데이터 추가
    5일 키값이 없을경우 http://localhost:3000/add/김성원/5를 입력하면 자동으로 추가
    5일 키값이 있는을경우 http://localhost:3000/add/김또깡/5를 입력하면 자동으로 추가
*/
app.post('/add/:userId/:day', function (req, res) {
    const userId = req.params.userId;
    const day = req.params.day;

    databaseRef.child(day + '일').transaction(function (currentData) {
        if (!currentData) {
            // 데이터가 없으면 초기화
            return [userId];
        } else {
            // 데이터가 있으면 중복 확인 후 추가
            if (!currentData.includes(userId)) {
                currentData.push(userId);
            }
            return currentData;
        }
    }).then(function (error) {
        if (error) {
            console.error(error);
        } else {
            console.log("Transaction succeeded.");
        }
    });

});

//마이페이지 
app.get('/mypage', function (req, res) {
    let today = new Date();
    var day_cal = today.toLocaleDateString('en-US').split('/')[1] 

    var cost = 0
    var week_fitness = 0
    var month_fitness = 0


    if( day_cal === "1" || day_cal === "2" || day_cal === "3" || day_cal === "4" || 
        day_cal === "5" || day_cal === "6" || day_cal === "7"  ){

            console.log("1주차입니다")

    }
    else if (day_cal === "8" || day_cal === "9" || day_cal === "10" || day_cal === "11" || 
        day_cal === "12" || day_cal === "13" || day_cal === "14"){

            console.log("2주차입니다")

    }

    else if (day_cal === "15" || day_cal === "16" || day_cal === "17" || day_cal === "18" || 
        day_cal === "19" || day_cal === "20" || day_cal === "21"){

            console.log("3주차입니다")

    }
    
    else if (day_cal === "22" || day_cal === "23" || day_cal === "24" || day_cal === "25" || 
        day_cal === "26" || day_cal === "27" || day_cal === "28"){

            console.log("4주차입니다")

    }

});



/*
    비용
    1주차에서  날짜9일과 , 김성원 키값을 입력 -  8~14일중 8일 - 이름필터 size >1이상이면 추가 해서 3이상이면 , 추가
    주차일수는 size >1이상이면 합산
    전체일수는 전체에서 size >1이상이면 합산\

        8일.filter (이름)  > 1 -> 1
        9일.filter (이름)  > 1 아니면 0
        10일.filter (이름)  > 1 -> 1
        11일.filter (이름)  > 1 아니면  0
        9일이면 8~ 13일까지 합이 3이하면 , 비용합산
        주차일수는 8 ~ 13일까지 합산
        전체일수는 1~31까지 반복문이용하여 처리


    달력 - 날짜 기준으로 적힌이름만 반복문으로 배치
*/

module.exports = router;