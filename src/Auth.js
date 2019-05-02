import firebase from "firebase";

const config = {
  apiKey: "AIzaSyA34lpwvWO93qhWdOY8ZNdUNsZCIslVxHA",
  authDomain: "git-hub-issues-sudhanshu-p2.firebaseapp.com",
  databaseURL: "https://git-hub-issues-sudhanshu-p2.firebaseio.com",
  projectId: "git-hub-issues-sudhanshu-p2",
  storageBucket: "git-hub-issues-sudhanshu-p2.appspot.com",
  messagingSenderId: "28678436101"
};
firebase.initializeApp(config);
var provider = new firebase.auth.GithubAuthProvider();
provider.addScope("repo");
provider.setCustomParameters({
  allow_signup: "false"
});

let myToken, user;
const Authentication = async event => {
  console.log(event.innerHTML);
  if (!sessionStorage.getItem("myToken") && event.innerHTML === "SignIn") {
    const result = await firebase.auth().signInWithPopup(provider);
    myToken = result.credential.accessToken;
    sessionStorage.setItem("myToken", myToken);
    user = result.user;
    console.log(user);
    event.innerHTML = "SignOut";
    // return myToken;
  }
  // if (sessionStorage.getItem("myToken") && event.innerHTML === "SignOut")
  else {
    // event.innerHTML = "SignIn";
    firebase
      .auth()
      .signOut()
      .then(function() {
        myToken = undefined;
        sessionStorage.removeItem("myToken");
        console.log("Sign-out successful.");
        event.innerHTML = "SignIn";
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};

export { Authentication };
