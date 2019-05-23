import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  AsyncStorage,
  ImageBackground
} from "react-native";
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
      <ImageBackground
        source={require("../../assets/landing.jpg")}
        style={styles.Wrapper}
        imageStyle={{
          resizeMode: "cover"
        }}
      >
        <View style={styles.Wrapper}>
          <Text
            style={{
              fontSize: 60,
              color: "white",
              fontFamily: "Pacifico"
            }}
          >
            ReCaller
          </Text>
          <Header>Login if you have a account</Header>

          <View style={{ width: "100%" }}>
            <View style={{ alignSelf: "center", width: 350 }}>
              <Input
                placeholder="Email"
                leftIcon={
                  <Icon
                    name="envelope"
                    size={18}
                    color="white"
                    style={{ marginRight: 9 }}
                    underlayColor={{}}
                  />
                }
                value={this.state.email}
                onChangeText={text => {
                  this.setState({ email: text });
                }}
                inputStyle={{
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  marginRight: 35,
                  paddingLeft: 10
                }}
                inputContainerStyle={{borderBottomWidth: 0}}
                placeholderTextColor="white"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <View style={{ paddingTop: 20 }} />
              <Input
                leftIcon={
                  <Icon
                    name="lock"
                    size={24}
                    color="white"
                    style={{ marginRight: 10 }}
                  />
                }
                style={{ borderLeftWidth: 0.5 }}
                value={this.state.password}
                onChangeText={text => {
                  this.setState({ password: text });
                }}
                inputStyle={{
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  marginRight: 35,
                  paddingLeft: 10,
                }}
                inputContainerStyle={{borderBottomWidth: 0}}
                placeholderTextColor="white"
                placeholder="Password"
                secureTextEntry={true}
              />
            </View>
            <View style={{ paddingTop: 40 }} />
            <View style={{ width: "50%", alignSelf: "center" }}>
              <Button
                title="Login"
                type="solid"
                onPress={this.onLoginPress}
                containerStyle={{ width: 150, alignSelf: "center" }}
                buttonStyle={{
                  borderColor: "black",
                  borderWidth: 1.5,
                  backgroundColor: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  // borderRadius: 10,
                  padding: 5,
                  height: 40
                }}
                titleStyle={{ color: "white" }}
              />

              <View style={{ paddingTop: 20 }} />

              <Button
                title="Create an account"
                type="outline"
                onPress={this.onCreateAccountPress}
                containerStyle={{ width: 150, alignSelf: "center" }}
                buttonStyle={{
                  borderColor: "black",
                  borderWidth: 1.5,
                  backgroundColor: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  // borderRadius: 10,
                  padding: 5,
                  height: 40
                }}
                titleStyle={{ color: "white" }}
              />

              <Icon
                color="white"
                style={{ fontSize: 18, alignSelf: "center", marginTop: 5 }}
                name="arrow-up"
              />
              <Text style={{ marginTop: 5, alignSelf: "center", color: "white" }}>
                Otherwise create one{" "}
              </Text>
            </View>
            <View style={{ paddingTop: 30 }} />
            <Button
              icon={<Icon name="google" size={15} color="white" />}
              title="Sign In With Google"
              onPress={this._signIn}
              containerStyle={{ alignSelf: "center", width: "45%" }}
              buttonStyle={{
                backgroundColor: "red",
                padding: 20,
                borderRadius: 25,
                height: 40
              }}
              titleStyle={{ fontSize: 14 }}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: "rgba(0, 0, 44, 0.4)",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});

const Header = styled.Text`
  font-size: 22;
  font-family: Roboto;
  color: white;
  margin-bottom: 5%;
  margin-top: 2%;
  /* text-decoration-line: underline; */
`;
