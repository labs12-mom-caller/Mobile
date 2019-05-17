import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  YellowBox
} from "react-native";
import { Container, Header, Content, Form, Item, Input } from "native-base";
import { db } from "../../constants/ApiKeys";
import * as firebase from "firebase";

export default class EmailUserModal extends Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = ["Setting a timer"];

    this.state = {
      // user: this.props.user,
      modalVisible: true,
      displayName: null,
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
      Alert.alert("good number");
      console.log(theNumber);
      this.setState({ correctPhone: String(theNumber) });
      return theNumber;
    }
  };

  updateUser = async () => {
    if (this.state.phoneNumber == null && this.state.displayName == null) {
      return;
    } else if (
      this.state.phoneNumber != null &&
      this.state.displayName != null
    ) {
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
              displayName: this.state.displayName,
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
      Alert.alert("Please Enter a Valid Number and a Username");
    }
  };

  render() {
    return this.props.user.phoneNumber === null &&
      this.props.user.displayName === null ? (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Display Name & Phone Number</Text>

              <Form>
                <Item regular error style={{ borderColor: "black" }}>
                  <Input
                    style={{ width: 200, height: 40, borderWidth: 1 }}
                    value={this.state.displayName}
                    onChangeText={text => {
                      this.setState({ displayName: text });
                    }}
                    placeholder="Display Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </Item>
                <Item regular error style={{ borderColor: "black" }}>
                  <Input
                    style={{ width: 200, height: 40, borderWidth: 1 }}
                    value={this.state.phoneNumber}
                    onChangeText={text => {
                      this.setState({ phoneNumber: text });
                    }}
                    placeholder="Phone Number"
                  />
                </Item>
                <TouchableHighlight
                  onPress={() => {
                    this.updateUser();
                  }}
                >
                  <Text>Submit</Text>
                </TouchableHighlight>
              </Form>
            </View>
          </View>
        </Modal>
      </View>
    ) : (
      <View>
        <Text>No</Text>
      </View>
    );
  }
}
