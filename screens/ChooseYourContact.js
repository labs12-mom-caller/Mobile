import React from "react";
import {
  StyleSheet,
  View,
  Alert,
  AsyncStorage,
  ImageBackground,
  Text
} from "react-native";
import { SocialIcon, Button, Input, Image, Tile } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";
import { db } from "../constants/ApiKeys";

console.disableYellowBox = true;

export default class ChooseYourContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      displayName: "",
      phoneNumber: ""
    };
  }

  gotoChoosePlan = async () => {
    const formattedPhone = await String("+1").concat(
      String(this.state.phoneNumber).replace(/[^\d]/g, "")
    );
    this.setState({ phoneNumber: formattedPhone });

    setTimeout(async () => {
      const userRef = await db
        .collection("users")
        .where("email", "==", this.state.email)
        .get();
      if (userRef.empty) {
        db.collection(`users`)
          .add(this.state)
          .then(ref => {
            Alert.alert("Success");
            Actions.choosecallplan({
              userId: this.props.user.uid,
              contactId: ref.id
            });
            // navigate(`/choose/${userId}/${ref.id}/call-plan`);
          });
      } else {
        Alert.alert("Failed");
        Actions.choosecallplan({
          user: this.props.user.uid,
          userRef: userRef.docs[0].id
        });
        // navigate(`/choose/${userId}/${userRef.docs[0].id}/call-plan`);
      }
    }, 1000);
    // Actions.choosecontact({ user: this.props.user });
  };

  render() {
    return (
      <View style={{justifyContent: "center", height: "100%"}}>
        <View>
          <Text
            style={{
              fontSize: 16,
              color: "black",
              width: "80%",
              textAlign: "center",
              alignSelf: "center",
              marginBottom: 50
            }}
          >
            Remembering to keep in touch with loved ones has never been easier!
            Please enter your loved one's information below to schedule a call.
            Your loved one will receive an email letting them know an account
            has been created for them.
          </Text>
        </View>
        <View>
          <View style={{ paddingTop: 20 }} />

          <Input
            placeholder="Your Contact's Name"
            leftIcon={
              <Icon
                name="user"
                size={18}
                color="black"
                style={{ marginRight: 9 }}
                underlayColor={{}}
              />
            }
            value={this.state.displayName}
            onChangeText={text => {
              this.setState({ displayName: text });
            }}
            inputStyle={{
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              marginRight: 35,
              paddingLeft: 10
            }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            placeholderTextColor="white"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={{ paddingTop: 20 }} />

          <Input
            placeholder="Your Contact's Email"
            leftIcon={
              <Icon
                name="envelope"
                size={16}
                color="black"
                style={{ marginRight: 6 }}
                underlayColor={{}}
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
            inputContainerStyle={{ borderBottomWidth: 0 }}
            placeholderTextColor="white"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={{ paddingTop: 20 }} />

          <Input
            placeholder="Your Contact's Phone Number"
            leftIcon={
              <Icon
                name="phone"
                size={16}
                color="black"
                style={{ marginRight: 8 }}
                underlayColor={{}}
              />
            }
            value={this.state.phoneNumber}
            onChangeText={text => {
              this.setState({ phoneNumber: text });
            }}
            inputStyle={{
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              marginRight: 35,
              paddingLeft: 10
            }}
            inputContainerStyle={{ borderBottomWidth: 0, marginBottom: 40 }}
            placeholderTextColor="white"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={{ paddingTop: 20 }} />

          <Button
            title="Choose a Plan"
            type="solid"
            onPress={this.gotoChoosePlan}
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
    );
  }
}
