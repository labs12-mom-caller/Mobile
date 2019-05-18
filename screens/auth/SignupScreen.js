import React from "react";
import { StyleSheet, View, Alert, ScrollView } from "react-native";
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
  };

  onBackToLoginPress = () => {
    Actions.pop();
  };

  onCreateAccountPress = () => {
    this.props.navigation.navigate("Signup");
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.Wrapper}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "black",
              fontFamily: "monospace"
            }}
          >
            ReCaller
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "black",
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

            <View style={{ paddingTop: 20 }} />

            <Input
              leftIcon={<Icon name="unlock" size={24} color="black" />}
              value={this.state.passwordConfirm}
              onChangeText={text => {
                this.setState({ passwordConfirm: text });
              }}
              placeholder="Confirm Password"
              secureTextEntry={true}
            />

            <View style={{ paddingTop: 20 }} />

            <View>
              <Button
                title="Signup"
                onPress={this.onSignupPress}
                containerStyle={{ alignSelf: "center", width: "45%" }}
                buttonStyle={{ backgroundColor: "green" }}
              />

              <View style={{ paddingTop: 20 }} />

              <Button
                title="Back to Login"
                onPress={this.onBackToLoginPress}
                containerStyle={{ alignSelf: "center", width: "45%" }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: "#dbdbdb",
    height: "100%",
    paddingTop: 40,
    paddingBottom: 200,
    alignItems: "center"
  }
});
