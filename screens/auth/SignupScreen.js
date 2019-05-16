import React from "react";
import { StyleSheet, View, Alert, ScrollView } from "react-native";
import { Button, Icon, Text, Input, Item } from "native-base";
import { SocialIcon } from "react-native-elements";
import * as firebase from "firebase";
import Dashboard from "../Dashboard";

export default class SignupScreen extends React.Component {
  static navigationOptions = {
    title: "Go back to login",
    headerTitleStyle: {
      fontWeight: "400",
      fontSize: 16,
      color: "white",
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
    this.props.navigation.navigate("Login");
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
            <Item regular style={{ borderColor: "black" }}>
              <Input
                style={{ width: 200, height: 40, borderWidth: 1 }}
                value={this.state.email}
                onChangeText={text => {
                  this.setState({ email: text });
                }}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>
            <View style={{ paddingTop: 20 }} />
            <Item regular style={{ borderColor: "black" }}>
              <Input
                style={{ width: 200, height: 40, borderWidth: 1 }}
                value={this.state.password}
                onChangeText={text => {
                  this.setState({ password: text });
                }}
                placeholder="Password"
                secureTextEntry={true}
              />
            </Item>

            <View style={{ paddingTop: 20 }} />
            <Item regular style={{ borderColor: "black" }}>
              <Input
                style={{ width: 200, height: 40, borderWidth: 1 }}
                value={this.state.passwordConfirm}
                onChangeText={text => {
                  this.setState({ passwordConfirm: text });
                }}
                placeholder="Confirm Password"
                secureTextEntry={true}
              />
            </Item>

            <View style={{ paddingTop: 20 }} />

            <Button
              title="Signup"
              onPress={this.onSignupPress}
              style={{ alignSelf: "center", width: 185 }}
              iconLeft
              type="outline"
            >
              <Icon name="md-create" />
              <Text uppercase={false}>Submit Details</Text>
            </Button>

            <View style={{ paddingTop: 20 }} />

            <Button
              title="Back to Login"
              onPress={this.onBackToLoginPress}
              style={{ alignSelf: "center", width: 185, marginBottom: "10%" }}
              iconLeft
              type="outline"
            >
              <Icon name="md-arrow-round-back" />
              <Text uppercase={false}>Back to Login</Text>
            </Button>
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
    paddingTop: 30,
    paddingBottom: 80,
    alignItems: "center"
  }
});
