import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDd1AwhQaSgrwGsp5ePKwSa42bVexf5wq0",
  authDomain: "todoist-clone-63100.firebaseapp.com",
  databaseURL: "https://todoist-clone-63100.firebaseio.com",
  projectId: "todoist-clone-63100",
  storageBucket: "todoist-clone-63100.appspot.com",
  messagingSenderId: "859265443596",
  appId: "1:859265443596:web:515686aba0f60e36224b29"
});

export { firebaseConfig as firebase };
