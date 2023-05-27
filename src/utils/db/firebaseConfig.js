import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const clientCredentials = {
	apiKey: "AIzaSyAf8FTNeqIXWwK7NpGweEWEgaDcoQrM7GE",
	authDomain: "dev-buddy-1969b.firebaseapp.com",
	databaseURL: "https://dev-buddy-1969b-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "dev-buddy-1969b",
	storageBucket: "dev-buddy-1969b.appspot.com",
	messagingSenderId: "396310947782",
	appId: "1:396310947782:web:d9b99685d5ac8eb984b4c7",
};

if (!firebase.apps.length) {
	firebase.initializeApp(clientCredentials);
}

export default firebase;
