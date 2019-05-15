import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View, Alert } from "react-native";
import { Container, Header, Content, Form, Item, Input } from "native-base";
import { db } from "../../constants/ApiKeys";
import * as firebase from "firebase";

export default class EmailUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: this.props.user,
      modalVisible: true,
      displayName: "",
      phoneNumber: ""
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  updateUser = () => {
    var user = firebase.auth().currentUser;
    console.log(user, "from update");
    db.doc(`users/${user.uid}`)
      .set(
        {
          displayName: this.state.displayName,
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
                <Item regular style={{ borderColor: "black" }}>
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
