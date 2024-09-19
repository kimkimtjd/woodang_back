# woodang_back

const firebase = require('firebase-admin'); <br/>
const serviceAccount = require('./woodang-b95b2-firebase-adminsdk-suy9t-0874d6ce2e.json');<br/>

// Initialize Firebase
firebase.initializeApp({<br/>
    credential: firebase.credential.cert(serviceAccount),<br/>
    databaseURL: "Realtime Database 데이터베이스 경로",<br/>
    storageBucket: 'Storage 폴더경로' <br/>
});<br/>
const database = firebase.database();<br/>
const storage = firebase.storage();  // Add storage reference<br/>

// Export both references for modularity<br/>
module.exports = {<br/>
  database,<br/>
  storage<br/>
};<br/>
