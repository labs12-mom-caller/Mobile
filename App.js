import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";

import AppNavigator from "./navigation/AppNavigator";
import MainTabNavigator from "./navigation/MainTabNavigator";
import { db } from "./constants/ApiKeys";

import * as firebase from "firebase";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticationReady: false,
      isAuthenticated: false
    };

    // Initialize firebase...
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = user => {
    this.setState({ isAuthenticationReady: true });
    this.setState({ isAuthenticated: !!user });
    this.setUser();
  };

  setUser = async () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var user = firebase.auth().currentUser;
        let name, email, photoUrl, uid, emailVerified;

        // const usersRef = db.collection("users").doc(user.uid);

        if (user != null) {
          displayName = user.displayName;
          email = user.email;
          phoneNumber = user.phoneNumber;
          photoUrl = user.photoURL;
          emailVerified = user.emailVerified;
          uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
          // this value to authenticate with your backend server, if
          // you have one. Use User.getToken() instead.
        }
        // User is signed in.
        // console.log(user.uid, "From user");

        var userRef = db.collection("users").doc(uid);

        var getDoc = userRef
          .get()
          .then(doc => {
            if (!doc.exists) {
              console.log("No such document!");

              var data = {
                displayName,
                email,
                uid
              };
              var setDoc = db
                .collection("users")
                .doc(uid)
                .set(data);

              var setWithOptions = setDoc.set(
                {
                  capital: true
                },
                { merge: true }
              );
              console.log(uid, "Document added");
            } else {
              console.log("Document data:", doc.data());
            }
          })
          .catch(err => {
            console.log("Error getting document", err);
          });
      } else {
        // No user is signed in.
        return;
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        {this.state.isAuthenticated ? <MainTabNavigator /> : <AppNavigator />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
