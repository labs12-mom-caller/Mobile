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
// import { db, auth } from "../constants/ApiKeys";

import * as firebase from "firebase";

import { TestComponent } from "./../components/AppComponents";
import LoginScreen from "./auth/LoginScreen";

export default class TestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
    // console.log(this.props.user, "From testscreen");
    console.log(this.state.user, "From testscreen");
  }

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
    // if (this.state.user === null) {
    //   return;
    // }
    return this.state.user === null ? (
      <LoginScreen />
    ) : (
      <View style={{ paddingTop: 20 }}>
        <TestComponent />
        <Button title="Signout" onPress={this._signOut} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
