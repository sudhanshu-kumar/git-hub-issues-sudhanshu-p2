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
const Authentication = async (event) => {
  console.log(event.innerHTML)
  if(event.innerHTML === "SignIn") {
    if (myToken) return myToken;
    const result = await firebase.auth().signInWithPopup(provider);
    myToken = result.credential.accessToken;
    user = result.user;
    console.log(user);
    event.innerHTML = "SignOut";
    return myToken;
  }
  if (event.innerHTML === "SignOut") {
    event.innerHTML = "SignIn";
    firebase
      .auth()
      .signOut()
      .then(function() {
        myToken = undefined;
        console.log("Sign-out successful.");
        
      })
      .catch(function(error) {
        // An error happened.
        console.log(error);
      });
  }
  

    // .then(function(result) {
    //   // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    //   var token = result.credential.accessToken;
    //   myToken = token;
    //   // The signed-in user info.
    //   var user = result.user;
    //   console.log(token, user);
    //   // ...
    //   return token;
    // })
    // .catch(function(error) {
    //   console.log(error);
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // ...
    // });
};

// exports.token = myToken;
export {Authentication, myToken, user} ;
