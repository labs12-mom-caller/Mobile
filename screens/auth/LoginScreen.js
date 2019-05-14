import React, { useState } from "react";
import { Button, Icon, Text, Input, Item } from "native-base";
import { SocialIcon } from "react-native-elements";

import { StyleSheet, View, Alert } from "react-native";
import { GoogleSignin, statusCodes } from "react-native-google-signin";
import * as firebase from "firebase";
import TestScreen from "../TestScreen";

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Welcome To ReCaller",
    headerTitleStyle: {
      fontWeight: "500",
      fontSize: 18,
      alignSelf: "center",
      color: "white",
      textAlign: "center",
      flex: 1
    },
    headerStyle: {
      backgroundColor: "grey"
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userInfo: null,
      error: null
    };
    console.log(this.state.userInfo);
  }

  async componentDidMount() {
    // this._configureGoogleSignIn();
    // await this._getCurrentUser();
  }

  // _configureGoogleSignIn() {
  //   GoogleSignin.configure({
  //     webClientId:
  //       "448806748779-mldp0sim81htt9oapau99r1647m26278.apps.googleusercontent.com",
  //     offlineAccess: false
  //   });
  // }

  // async _getCurrentUser() {
  //   try {
  //     const userInfo = await GoogleSignin.signInSilently();
  //     this.setState({ userInfo, error: null });
  //     // console.log(userInfo.user, "Getting current user");
  //   } catch (error) {
  //     const errorMessage =
  //       error.code === statusCodes.SIGN_IN_REQUIRED
  //         ? "Please sign in :)"
  //         : error.message;
  //     this.setState({
  //       error: new Error(errorMessage)
  //     });
  //   }
  // }

  _signIn = async () => {
    try {
      // Add any configuration settings here:
      GoogleSignin.configure({
        webClientId:
          "448806748779-mldp0sim81htt9oapau99r1647m26278.apps.googleusercontent.com",
        offlineAccess: false
      });

      const data = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );
      // login with credential
      const currentUser = await firebase
        .auth()
        .signInWithCredential(credential);
    } catch (e) {
      Alert.alert("Canceled Login");
    }
  };

  onPress = () => {
    if (this.state.user) {
      this.signOutAsync();
    } else {
      this.signInAsync();
    }
  };

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("TestScreen");
      } else {
        this.props.navigation.navigate("LoginScreen");
      }
    });
  };

  onLoginPress = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {})
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  onCreateAccountPress = () => {
    this.props.navigation.navigate("Signup");
  };

  onForgotPasswordPress = () => {
    this.props.navigation.navigate("ForgotPassword");
  };

  render() {
    const { errorCode } = this.state;
    if (this.state.user || this.state.userInfo !== null) {
      console.log("Authenticated!");
      return <TestScreen user={this.state.userInfo.user} />;
    }
    return (
      <View style={styles.Wrapper}>
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            marginTop: "5%",
            color: "black",
            fontFamily: "monospace"
          }}
        >
          ReCaller
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
            marginBottom: "10%",
            marginTop: "5%",
            textDecorationLine: "underline"
          }}
        >
          Login
        </Text>

        <View style={{ width: "75%" }}>
          <Item regular style={{ borderColor: "black" }}>
            <Input
              placeholder="Rounded Textbox"
              value={this.state.email}
              onChangeText={text => {
                this.setState({ email: text });
              }}
              placeholder="Email"
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Item>
          <View style={{ paddingTop: 20 }} />
          <Item regular style={{ borderColor: "black" }}>
            <Input
              value={this.state.password}
              onChangeText={text => {
                this.setState({ password: text });
              }}
              placeholder="Password"
              secureTextEntry={true}
              leftIcon={{ type: "font-awesome", name: "lock" }}
            />
          </Item>

          <View style={{ paddingTop: 20 }} />

          <View style={{}}>
            <Button
              iconLeft
              type="outline"
              onPress={this.onLoginPress}
              style={{ alignSelf: "center", width: 185 }}
            >
              <Icon name="md-send" />
              <Text uppercase={false}>Submit Email Login</Text>
            </Button>

            <View style={{ paddingTop: 20 }} />

            <Button
              iconLeft
              type="outline"
              onPress={this.onCreateAccountPress}
              style={{ alignSelf: "center", width: 185 }}
            >
              <Icon name="md-create" />
              <Text uppercase={false}>Sign Up With Email</Text>
            </Button>
            <Text style={{ marginTop: 15, alignSelf: "center" }}>
              Don't have an account?{" "}
              <Icon style={{ fontSize: 20 }} name="arrow-round-up" />
            </Text>
          </View>

          <View style={{ paddingTop: 50 }} />
          <SocialIcon
            title="Sign In With Google"
            button
            type="google"
            onPress={this._signIn}
            style={{ backgroundColor: "red", width: 185, alignSelf: "center" }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: "#dbdbdb",
    height: "100%",
    paddingTop: 30,
    alignItems: "center"
  }
});
