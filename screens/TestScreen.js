import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import { GoogleSignin } from "react-native-google-signin";
import { db } from "../constants/ApiKeys";

import * as firebase from "firebase";

import { EmailUserModal } from "./../components/AppComponents";
import LoginScreen from "./auth/LoginScreen";

export default class TestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };

  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    var user = firebase.auth().currentUser;

    var userRef = db.collection("users").doc(user.uid);
    var getDoc = userRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          console.log("Document data: From TestScreen", doc.data());
          this.setState({ user: doc.data()})
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  _signOut = async () => {
    try {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
          console.log("Signed out");
        });
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      this.setState({ user: null, error: null });
    } catch (error) {
      this.setState({
        error
      });
    }
  };

  render() {
    if (this.props.user === null) {
      return;
    }
    return this.state.user === null ? (
      <LoginScreen />
    ) : (
      <View style={{ paddingTop: 20 }}>
        <EmailUserModal user={this.state.user} />
        <Text>{this.state.user.displayName}</Text>
        <Button title="Signout" onPress={this._signOut} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
