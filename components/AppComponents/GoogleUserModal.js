import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  StyleSheet
} from "react-native";
import { Container, Header, Content, Form, Item, Input } from "native-base";
import { db } from "../../constants/ApiKeys";
import * as firebase from "firebase";

console.disableYellowBox = true;

export default class GoogleUserModal extends Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = ["Setting a timer"];
    this.state = {
      modalVisible: true,
      phoneNumber: null,
      correctPhone: null
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  numCheck = number => {
    if (Array.from(number).length != 12) {
      Alert.alert("enter valid number");
      return;
    } else {
      const theNumber = number;
      // Alert.alert("good number");
      console.log(theNumber);
      this.setState({ correctPhone: String(theNumber) });
      return theNumber;
    }
  };

  updateUser = async () => {
    if (this.state.phoneNumber == null) {
      return;
    } else if (this.state.phoneNumber != null) {
      var user = await firebase.auth().currentUser;
      console.log(user, "from update");
      const formattedPhone = await String("+1").concat(
        String(this.state.phoneNumber).replace(/[^\d]/g, "")
      );
      console.log(formattedPhone);
      this.numCheck(formattedPhone);
      // if (this.state.phoneNumber == null) {
      //   return;
      // }
      if (this.state.correctPhone != null) {
        await db
          .doc(`users/${user.uid}`)
          .set(
            {
              phoneNumber: this.state.correctPhone
            },
            { merge: true }
          )
          .then(function() {
            // Update successful.
            console.log("success");
          })
          .catch(function(error) {
            console.log("failed");
            // An error happened.
          });
        this.setState({ modalVisible: !this.state.modalVisible });
      }
    } else {
      Alert.alert("Please enter a valid phone number");
    }
  };

  render() {
    return this.props.user.phoneNumber === null &&
      this.props.user.displayName != null ? (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          // onRequestClose={() => {
          //   Alert.alert("Modal has been closed.");
          // }}
        >
          <View style={styles.Wrapper}>
            <Text style={styles.Label}>Please enter your phone number</Text>
            <Form>
              <Item
                regular
                style={{
                  borderColor: "black",
                  width: "70%",
                  height: 40,
                  alignSelf: "center"
                }}
              >
                <Input
                  // style={{ borderWidth: 1 }}
                  value={this.state.phoneNumber}
                  onChangeText={text => {
                    this.setState({ phoneNumber: text });
                  }}
                  placeholder="Phone Number"
                />
              </Item>
              <TouchableHighlight
                style={styles.Button}
                onPress={() => {
                  this.updateUser();
                }}
              >
                <Text style={{ color: "blue" }}>Submit</Text>
              </TouchableHighlight>
            </Form>
          </View>
        </Modal>
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    justifyContent: "center"
  },
  Label: {
    alignSelf: "center",
    marginBottom: "3%",
    color: "black",
    fontSize: 20
  },
  Button: {
    alignSelf: "center",
    marginTop: "3%",
    borderWidth: 1,
    padding: 5
  }
});
