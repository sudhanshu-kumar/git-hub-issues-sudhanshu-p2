import firebase from "firebase";

const config = {
  apiKey: "AIzaSyA34lpwvWO93qhWdOY8ZNdUNsZCIslVxHA",
  authDomain: "git-hub-issues-sudhanshu-p2.firebaseapp.com",
  databaseURL: "https://git-hub-issues-sudhanshu-p2.firebaseio.com",
  projectId: "git-hub-issues-sudhanshu-p2",
  storageBucket: "",
  messagingSenderId: "28678436101"
};
firebase.initializeApp(config);
var provider = new firebase.auth.GithubAuthProvider();
provider.addScope('repo');

export default provider;
