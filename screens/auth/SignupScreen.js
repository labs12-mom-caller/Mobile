import React from "react";
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  ImageBackground
} from "react-native";
import { Text, Item } from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";
import { SocialIcon, Button, Input, Image, Tile } from "react-native-elements";

import * as firebase from "firebase";
import { Actions } from "react-native-router-flux";

console.disableYellowBox = true;

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = ["Setting a timer"];
    this.state = {
      email: "",
      password: "",
      passwordConfirm: ""
    };
  }

  onSignupPress = () => {
    if (this.state.password !== this.state.passwordConfirm) {
      Alert.alert("Passwords do not match");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {})
      .catch(error => {
        Alert.alert(error.message);
      });
    // Actions.main({ type: "reset" });
  };

  onBackToLoginPress = () => {
    Actions.pop();
  };

  onCreateAccountPress = () => {
    this.props.navigation.navigate("Signup");
  };

  render() {
    return (
      // <ScrollView>
      <ImageBackground
        source={require("../../assets/womanOnPhone.jpg")}
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
          <Text
            style={{
              fontSize: 16,
              color: "white",
              marginBottom: "10%",
              marginTop: "5%",
              width: "80%",
              textAlign: "center"
            }}
          >
            Never forget to call your loved ones by creating a new ReCall, which
            will automatically call both you and a person of your choosing, and
            record the call for future review. Get started by letting us know
            your information below
          </Text>

          <View style={{ width: "75%" }}>
            <View style={{ paddingTop: 20 }} />
            <View style={{ alignSelf: "center", width: 350 }}>
              <Input
                placeholder="Email"
                leftIcon={
                  <Icon
                    name="envelope"
                    size={18}
                    color="white"
                    style={{ marginRight: 9 }}
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
                  paddingLeft: 10
                }}
                placeholderTextColor="white"
                placeholder="Password"
                secureTextEntry={true}
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
                value={this.state.passwordConfirm}
                onChangeText={text => {
                  this.setState({ passwordConfirm: text });
                }}
                inputStyle={{
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  marginRight: 35,
                  paddingLeft: 10
                }}
                placeholderTextColor="white"
                placeholder="Confirm Password"
                secureTextEntry={true}
              />
            </View>

            <View style={{ paddingTop: 20 }} />

            <View>
              <Button
                title="Signup"
                onPress={this.onSignupPress}
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
                title="Back to Login"
                onPress={this.onBackToLoginPress}
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
            </View>
          </View>
        </View>
        {/* </ScrollView> */}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: "rgba(0, 0, 44, 0.5)",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});
