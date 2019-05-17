import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  YellowBox
} from "react-native";
import { Card, Icon } from "react-native-elements";
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  List,
  ListItem
} from "native-base";

import { GoogleSignin } from "react-native-google-signin";
import { db } from "../constants/ApiKeys";
import * as firebase from "firebase";

import { EmailUserModal, GoogleUserModal } from "./../components/AppComponents";
import LoginScreen from "./auth/LoginScreen";
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
      // await GoogleSignin.revokeAccess();
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
      <ScrollView style={{ paddingTop: 20 }}>
        <Card>
          <View style={styles.user}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: this.state.user.photoUrl }}
            />
            <Text style={styles.userInfo}>{this.state.user.displayName}</Text>
            <Text style={styles.userInfo}>{this.state.user.phoneNumber}</Text>
            <Text style={styles.userInfo}>{this.state.user.email}</Text>
            <Button style={styles.userButton} rounded dark>
              <Text>Add Call</Text>
            </Button>
            <Button style={styles.userButton} rounded dark>
              <Text>Billing</Text>
            </Button>
          </View>
        </Card>
        <Button style={styles.userButton} rounded dark onPress={this._signOut}>
          <Text>Signout</Text>
        </Button>

        <List>
          <ListItem itemHeader first style={styles.yourContact}>
            <Text style={{ textAlign: "center" }}>Your Contacts</Text>
          </ListItem>
          <ScheduledContacts user={this.state.user.uid} />
        </List>

        <List>
          <ListItem itemHeader style={styles.prevCall}>
            <Text style={{ textAlign: "center" }}>Previous Calls</Text>
          </ListItem>
          <PreviousCalls userId={this.state.user.uid} />
        </List>

        <EmailUserModal user={this.state.user} />
        <GoogleUserModal user={this.state.user} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  userInfo: {
    textAlign: "center"
  },
  user: {
    alignSelf: "center"
  },
  image: {
    height: 100,
    width: 100,
    alignSelf: "center"
  },
  userButton: {
    alignSelf: "center"
  },
  yourContact: {
    alignSelf: "center"
  },
  contact: {
    alignSelf: "center"
  },
  prevCall: {
    alignSelf: "center"
  },
  call: {
    alignSelf: "center"
  }
});
