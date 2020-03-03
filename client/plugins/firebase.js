import firebase from 'firebase'

if(!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyC6_O7fkURtRj7cpVxWn62s-heKQmhdyd4",
        authDomain: "sengen-prototype.firebaseapp.com",
        databaseURL: "https://sengen-prototype.firebaseio.com",
        projectId: "sengen-prototype",
        storageBucket: "sengen-prototype.appspot.com",
        messagingSenderId: "737990977941",
        appId: "1:737990977941:web:4c3f725448716771f16e9c"
    })
}

export default firebase