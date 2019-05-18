import React, { useState } from "react";
import { StyleSheet, View, Alert, AsyncStorage } from "react-native";
import { Text, Item } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { SocialIcon, Button, Input, Image, Tile } from "react-native-elements";

import { GoogleSignin } from "react-native-google-signin";
import Dashboard from "../Dashboard";
import * as firebase from "firebase";
import { Actions } from "react-native-router-flux";
import styled from "styled-components";

console.disableYellowBox = true;

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = ["Setting a timer"];
    this.state = {
      email: "",
      password: "",
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
      await GoogleSignin.revokeAccess();
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );
      // login with credential
      const currentUser = await firebase
        .auth()
        .signInWithCredential(credential);
      this.storeData();
      Actions.main();
    } catch (e) {
      Alert.alert("Canceled Login");
    }
  };

  storeData = async () => {
    try {
      await AsyncStorage.setItem("token");
    } catch (err) {
      console.log(err);
    }
  };

  onLoginPress = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.storeData();
        Actions.main();
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  onCreateAccountPress = () => {
    Actions.signup();
  };

  render() {
    if (this.state.user || this.state.userInfo != null) {
      return <Dashboard user={this.state.userInfo.user} />;
    }

    return (
      <View style={styles.Wrapper}>
        <Text
          style={{
            fontSize: 60,
            color: "black",
            fontFamily: "Pacifico"
          }}
        >
          ReCaller
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "roboto",
            color: "black",
            marginBottom: "10%",
            marginTop: "5%",
            textDecorationLine: "underline"
          }}
        >
          Login if you have a account
        </Text>

        <View style={{ width: "75%" }}>
          <Input
            placeholder="Email"
            leftIcon={<Icon name="envelope" size={18} color="black" />}
            value={this.state.email}
            onChangeText={text => {
              this.setState({ email: text });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={{ paddingTop: 20 }} />
          <Input
            leftIcon={<Icon name="lock" size={24} color="black" />}
            style={{ borderLeftWidth: 0.5 }}
            value={this.state.password}
            onChangeText={text => {
              this.setState({ password: text });
            }}
            placeholder="Password"
            secureTextEntry={true}
          />
          <View style={{ paddingTop: 40 }} />
          <View>
            <Button
              title="Login"
              onPress={this.onLoginPress}
              containerStyle={{ alignSelf: "center", width: "45%" }}
              buttonStyle={{ backgroundColor: "green" }}
            />

            <View style={{ paddingTop: 20 }} />

            <Button
              title="Create an account"
              onPress={this.onCreateAccountPress}
              containerStyle={{ alignSelf: "center", width: "45%" }}
            />

            <Text style={{ marginTop: 15, alignSelf: "center" }}>
              Otherwise create one{" "}
              <Icon style={{ fontSize: 18 }} name="arrow-up" />
            </Text>
          </View>
          <View style={{ paddingTop: 50 }} />
          <Button
            icon={<Icon name="google" size={15} color="white" />}
            title="Sign In With Google"
            onPress={this._signIn}
            containerStyle={{ alignSelf: "center", width: "45%" }}
            buttonStyle={{
              backgroundColor: "red",
              paddingHorizontal: 20,
              borderRadius: 5,
              height: 45
            }}
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
