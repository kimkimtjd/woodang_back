# woodang_back

const firebase = require('firebase-admin');
const serviceAccount = require('./woodang-b95b2-firebase-adminsdk-suy9t-0874d6ce2e.json');

// Initialize Firebase
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "Realtime Database 데이터베이스 경로",
    storageBucket: 'Storage 폴더경로' 
});

const database = firebase.database();
const storage = firebase.storage();  // Add storage reference

// Export both references for modularity
module.exports = {
  database,
  storage
};
