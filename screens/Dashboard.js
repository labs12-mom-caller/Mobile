import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";
import { Card, Avatar, Button } from "react-native-elements";
import { Text, List, ListItem } from "native-base";
import styled from "styled-components";

import { GoogleSignin } from "react-native-google-signin";
import { db } from "../constants/ApiKeys";
import * as firebase from "firebase";
import RNExitApp from "react-native-exit-app";
import { Actions } from "react-native-router-flux";
import { EmailUserModal, GoogleUserModal } from "./../components/AppComponents";
import ScheduledContacts from "../components/AppComponents/ScheduledContacts";
import PreviousCalls from "../components/AppComponents/PreviousCalls";

console.disableYellowBox = true;

const userProfile = {
  name: "Shawn",
  avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
};

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = ["Setting a timer"];
    this.state = {
      user: null,
      selectedIndex: null
    };
  }

  componentDidMount() {
    this.getUser();
  }

  removeData = async () => {
    try {
      const value = await AsyncStorage.removeItem("token");
      // RNExitApp.exitApp();
      Actions.login({ type: "replace" });
    } catch (err) {
      console.log(err);
    }
  };

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
          this.setState({ user: doc.data() });
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
      // this.setState({ user: null }); // Remember to remove the user from your app's state as well
      this.removeData();
    } catch (error) {
      console.error(error);
    }
  };

  _signOut = async () => {
    this.removeData();
    try {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
          console.log("Signed out");
        });
      // await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      // this.setState({ user: null, error: null });
    } catch (error) {
      this.setState({
        error
      });
    }
  };

  updateAcc = () => {
    Actions.update({ user: this.state.user });
  };

  gotoBilling = () => {
    Actions.billing({ user: this.state.user });
  };

  formatForDisplay = num => {
    let clean = ("" + num).replace(/\D/g, "");
    let match = clean.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      let international = match[1] ? "+1" : "";
      return [international, "(", match[2], ") ", match[3], "-", match[4]]
        .join("")
        .replace("+1", "");
    }
    return null;
  };

  render() {
    if (this.state.user === null) {
      return <Loading>Loading...</Loading>;
    }
    // return this.state.user === null ? (
    //   <LoginScreen />
    // ) : (
    return (
      <ScrollView style={{ paddingTop: 20 }}>
        <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        <SignOut onPress={this._signOut}>Signout</SignOut>
        <Container>
          <Card>
            <Avatar
              style={{ alignSelf: "center", width: 150, height: 150 }}
              source={{ uri: this.state.user.photoUrl }}
              // showEditButton
              size="xlarge"
              rounded
              onPress={this.updateAcc}
              activeOpacity={0.7}
            />
            <ProfileInfo>
              <ProfileText
                onPress={this.updateAcc}
                style={{ marginBottom: 20, color: "blue" }}
              >
                Update Profile
              </ProfileText>
              <ProfileText>{this.state.user.displayName}</ProfileText>
              <ProfileText>
                {this.formatForDisplay(this.state.user.phoneNumber)}
              </ProfileText>
              <ProfileText>{this.state.user.email}</ProfileText>
            </ProfileInfo>
          </Card>
        </Container>

        <View style={{ alignSelf: "center", flexDirection: "row" }}>
          <Button
            title="Add Call"
            type="outline"
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "black",
              marginTop: 10,
              marginHorizontal: 5,
              width: 100
            }}
            titleStyle={{ color: "black" }}
          />
          <Button
            title="Billing"
            type="outline"
            onPress={this.gotoBilling}
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "black",
              marginTop: 10,
              width: 100
            }}
            titleStyle={{ color: "black" }}
          />
        </View>

        <ComponentContainer>
          <List style={{ marginBottom: 35 }}>
            <Lists>
              <Header>Your Contacts</Header>
            </Lists>
            <ScheduledContacts user={this.state.user} />
          </List>

          <List style={{ marginBottom: 35 }}>
            <Lists>
              <Header>Previous Calls</Header>
            </Lists>
            <PreviousCalls userId={this.state.user.uid} />
          </List>
        </ComponentContainer>

        <EmailUserModal user={this.state.user} />
        <GoogleUserModal user={this.state.user} />
      </ScrollView>
    );
  }
}

const Container = styled.View`
  width: 75%;
  align-self: center;
`;

const ProfileInfo = styled.View`
  flex-direction: column;
  align-self: center;
`;

const ProfileText = styled.Text`
  text-align: center;
  margin-bottom: 10;
  font-weight: 600;
`;

const SignOut = styled.Text`
  align-self: center;
`;

const ComponentContainer = styled.View`
  width: 90%;
  margin-top: 25;
  align-self: center;
`;

const Header = styled.Text`
  align-self: center;
  font-weight: bold;
  font-size: 18;
`;

const Lists = styled(ListItem)`
  align-self: center;
  width: 100%;
  /* margin-left: 72%; */
  margin-bottom: 5%;
`;

const Loading = styled.Text`
  align-self: center;
  font-size: 60;
  margin-top: 100;
`;
