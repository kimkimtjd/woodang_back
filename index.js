const express = require('express')
const app = express()
const port = 3000
const router = express.Router();
// config.js에서 export한 모듈을 다음과 같이 import 시킬 수 있다. (같은 디렉토리 위치)
const database = require('./config');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const storage = database.storage.bucket();


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const databaseRef = database.database.ref('users');

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

//마이페이지 - 주간 , 비용
app.get('/mypage/week/:userId', function (req, res) {
    let today = new Date();
    var day_cal = today.toLocaleDateString('en-US').split('/')[1]
    const userId = req.params.userId;

    if (day_cal >= 1 && day_cal <= 7) {
        let totalCount = 0; // 모든 날짜의 "김성원" 총 합계

        const promises = [];
        for (let i = 1; i <= 7; i++) {
            const targetDay = i + '일';
            promises.push(
                databaseRef.child(targetDay).once('value').then((snapshot) => {
                    const data = snapshot.val();
                    if (data && Array.isArray(data)) {
                        const count = data.filter(element => element === userId).length;
                        totalCount += count; // 총 합계에 추가
                        return count;
                    } else {
                        console.log(`Day ${i}: No data or not an array`);
                        return 0;
                    }
                })
            );
        }

        Promise.all(promises)
            .then(() => {
                //일주일에 3번이하일경우
                if (totalCount < 3) {
                    res.json({ week: totalCount, cost: 5000 })
                }
                else {
                    res.json({ week: totalCount, cost: 0 })
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }

    else if (day_cal >= 8 && day_cal <= 14) {
        let totalCount = 0; // 모든 날짜의 "김성원" 총 합계

        const promises = [];
        for (let i = 8; i <= 14; i++) {
            const targetDay = i + '일';
            promises.push(
                databaseRef.child(targetDay).once('value').then((snapshot) => {
                    const data = snapshot.val();
                    if (data && Array.isArray(data)) {
                        const count = data.filter(element => element === userId).length;
                        totalCount += count; // 총 합계에 추가
                        return count;
                    } else {
                        console.log(`Day ${i}: No data or not an array`);
                        return 0;
                    }
                })
            );
        }

        Promise.all(promises)
            .then(() => {
                // console.log('김성원이 포함된 총 날짜 수:', totalCount);
                //일주일에 3번이하일경우
                if (totalCount < 3) {
                    res.json({ week: totalCount, cost: 5000 })
                }
                else {
                    res.json({ week: totalCount, cost: 0 })
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }

    else if (day_cal >= 15 && day_cal <= 21) {
        let totalCount = 0; // 모든 날짜의 "김성원" 총 합계

        const promises = [];
        for (let i = 15; i <= 21; i++) {
            const targetDay = i + '일';
            promises.push(
                databaseRef.child(targetDay).once('value').then((snapshot) => {
                    const data = snapshot.val();
                    if (data && Array.isArray(data)) {
                        const count = data.filter(element => element === userId).length;
                        totalCount += count; // 총 합계에 추가
                        return count;
                    } else {
                        console.log(`Day ${i}: No data or not an array`);
                        return 0;
                    }
                })
            );
        }

        Promise.all(promises)
            .then(() => {
                //일주일에 3번이하일경우
                if (totalCount < 3) {
                    res.json({ week: totalCount, cost: 5000 })
                }
                else {
                    res.json({ week: totalCount, cost: 0 })
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }

    else if (day_cal >= 22 && day_cal <= 28) {
        let totalCount = 0; // 모든 날짜의 "김성원" 총 합계
        let totalCount_month = 0; // 모든 날짜의 "김성원" 총 합계

        const promises = [];
        for (let i = 22; i <= 28; i++) {
            const targetDay = i + '일';
            promises.push(
                databaseRef.child(targetDay).once('value').then((snapshot) => {
                    const data = snapshot.val();
                    if (data && Array.isArray(data)) {
                        const count = data.filter(element => element === userId).length;
                        totalCount += count; // 총 합계에 추가
                        return count;
                    } else {
                        console.log(`Day ${i}: No data or not an array`);
                        return 0;
                    }
                })
            );
        }

        Promise.all(promises)
            .then(() => {
                // console.log('김성원이 포함된 총 날짜 수:', totalCount);
                //일주일에 3번이하일경우
                if (totalCount < 3) {
                    res.json({ week: totalCount, cost: 5000 })
                }
                else {
                    res.json({ week: totalCount, cost: 0 })
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }


});

//마이페이지 - 월간
app.get('/mypage/month/:userId', function (req, res) {
    const userId = req.params.userId;

    let totalCount = 0; // 모든 날짜의 "김성원" 총 합계

    const promises = [];
    for (let i = 1; i <= 28; i++) {
        const targetDay = i + '일';
        promises.push(
            databaseRef.child(targetDay).once('value').then((snapshot) => {
                const data = snapshot.val();
                if (data && Array.isArray(data)) {
                    const count = data.filter(element => element === userId).length;
                    totalCount += count; // 총 합계에 추가
                    return count;
                } else {
                    console.log(`Day ${i}: No data or not an array`);
                    return 0;
                }
            })
        );
    }

    Promise.all(promises)
        .then(() => {
            // console.log('김성원이 포함된 총 날짜 수:', totalCount);
            res.json({ month: totalCount })
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });



});


//이미지 업로드후 ftp주소 , 이름 , 날짜를 DB에 저장
app.post('/upload/:userId/:day', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        const filePath = `images/${file.originalname}`;
        const userId = req.params.userId;
        const day = req.params.day;

        // 임시 파일을 Firebase Storage에 업로드
        await storage.upload(file.path, {
            destination: filePath,
        });


        // 업로드된 파일의 다운로드 URL 가져오기
        const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/images%2f${file.originalname}?alt=media`;


        database.database.ref('image').child(userId).child(day + '일').set(downloadURL)
            .then(() => {
                console.log('데이터가 성공적으로 저장되었습니다.');
            })
            .catch((error) => {
                console.error('데이터 저장 중 오류 발생:', error);
            });

        res.json({ iage_url: downloadURL, name: 5000 })


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Image upload failed' });
    }
});

module.exports = router;
