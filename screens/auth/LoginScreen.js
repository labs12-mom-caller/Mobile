import React, { useState } from "react";
import { Button, Icon, Text, Input, Item } from "native-base";
import { SocialIcon } from "react-native-elements";

import { StyleSheet, View, Alert } from "react-native";
import { GoogleSignin } from "react-native-google-signin";
import Dashboard from "../Dashboard";
import * as firebase from "firebase";

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
    console.ignoredYellowBox = ["Setting a timer"];
    this.state = {
      email: "dain@test.com",
      password: "testing",
      userInfo: null,
      error: null
    };
  }

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

  render() {
    if (this.state.user || this.state.userInfo != null) {
      return <Dashboard user={this.state.userInfo.user} />;
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
            <Icon active name="mail" />
            <Input
              style={{ borderLeft: "1px", borderLeftWidth: 0.5 }}
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
            <Icon active name="done-all" />
            <Input
              style={{ borderLeftWidth: 0.5 }}
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
