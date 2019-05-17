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
      phoneNumber: null
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  numCheck = number => {
    if (Array.from(number).length != 12) {
      Alert.alert("enter valid number");
    } else {
      if (Array.from(number).length) {
        Alert.alert("good number");
        return String(number);
      }
    }
  };

  updateUser = () => {
    if ((this.state.phoneNumber == null && this.state.displayName == null)) {
      return;
    } else if (
      this.state.phoneNumber != null &&
      this.state.displayName != null
    ) {
      var user = firebase.auth().currentUser;
      console.log(user, "from update");
      const formattedPhone = String("+1").concat(
        String(this.state.phoneNumber).replace(/[^\d]/g, "")
      );

      db.doc(`users/${user.uid}`)
        .set(
          {
            displayName: this.state.displayName,
            phoneNumber: formattedPhone
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
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text>Close Modal</Text>
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
