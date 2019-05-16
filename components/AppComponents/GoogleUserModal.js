import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View, Alert } from "react-native";
import { Container, Header, Content, Form, Item, Input } from "native-base";
import { db } from "../../constants/ApiKeys";
import * as firebase from "firebase";

export default class GoogleUserModal extends Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = ["Setting a timer"];
    this.state = {
      modalVisible: true,
      phoneNumber: ""
    };
  }

  formatPhoneNumber = number => {
    const numberCopy = [...number];
    const digitsOnly = numberCopy.slice(2);
    const withDashes = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(
      3,
      6
    )}-${digitsOnly.slice(6)}`;
    const formatted = [...withDashes];
    const phoneNumber = formatted.filter(n => n !== ",");
    phoneNumber.join("");
    this.setState({ phoneNumber });
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  updateUser = () => {
    var user = firebase.auth().currentUser;
    console.log(user, "from update");
    this.formatPhoneNumber(user.phoneNumber);
    db.doc(`users/${user.uid}`)
      .set(
        {
          phoneNumber: this.state.phoneNumber
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
  };

  render() {
    return this.props.user.phoneNumber === null &&
      this.props.user.displayName ? (
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
              <Text>Phone Number</Text>

              <Form>
                <Item regular style={{ borderColor: "black" }}>
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
                    this.updateUser(),
                      this.setModalVisible(!this.state.modalVisible);
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
