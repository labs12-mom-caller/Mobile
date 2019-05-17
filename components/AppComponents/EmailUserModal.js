import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  YellowBox,
  StyleSheet,
  Platform,
  Image,
  Button
} from "react-native";
import { Container, Header, Content, Form, Item, Input } from "native-base";
// import { db } from "../../constants/ApiKeys";
import * as firebase from "firebase";
import ImagePicker from "react-native-image-picker";

const options = {
  title: "Upload an image",
  storageOptions: {
    skipBackup: true,
    path: `user-profiles`
  }
};

export default class EmailUserModal extends Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = ["Setting a timer"];
    this.state = {
      // user: this.props.user,
      modalVisible: true,
      displayName: null,
      phoneNumber: null,
      correctPhone: null,
      pickedImage: null,
      image: null,
      uploading: false
    };
  }

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      uploadUrl = await this.uploadImageAsync(pickerResult.uri);
      this.setState({ image: uploadUrl });
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
  };

  uploadImageAsync = async uri => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    // console.log(blob)
    // console.log(this.state.image, "from image");
    const ref = firebase
      .storage()
      .ref(`user-profiles`)
      .child(this.props.user.uid)
      .child(this.props.user.uid)
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();
    // console.log(snapshot.ref.getDownloadURL());
    return await snapshot.ref.getDownloadURL();
  };

  // reset = () => {
  //   this.setState({
  //     pickedImage: null
  //   });
  // };

  pickImageHandler = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        console.log(response);
        this._handleImagePicked(response);
        // pictureRef =  snapshot.ref.getDownloadURL();
        this.setState({
          image: response.data.uri
        });
      }
    });
  };

  // uploadImage = image => {
  //   var storageRef = firebase
  //     .storage()
  //     .ref(`user-profiles/${this.props.user.uid}`);

  //   storageRef.putString(image, "base64", { contentType: "image/jpg" });
  // };

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
          <View style={styles.Wrapper}>
            <View>
              <Text style={styles.Label}>Please enter a</Text>
              <Text style={styles.Label}>Displayname & Phone number</Text>
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
                    style={{ width: 200, height: 40 }}
                    value={this.state.displayName}
                    onChangeText={text => {
                      this.setState({ displayName: text });
                    }}
                    placeholder="Display Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </Item>
                <Item
                  regular
                  style={{
                    borderColor: "black",
                    width: "70%",
                    height: 40,
                    alignSelf: "center",
                    marginTop: "3%"
                  }}
                >
                  <Input
                    style={{ width: 200, height: 40 }}
                    value={this.state.phoneNumber}
                    onChangeText={text => {
                      this.setState({ phoneNumber: text });
                    }}
                    placeholder="Phone Number"
                  />
                </Item>

                <View style={styles.container}>
                  <View style={styles.placeholder}>
                    <Image
                      source={this.state.image}
                      style={styles.previewImage}
                    />
                  </View>
                  <View style={styles.button}>
                    <Button
                      title="Pick Image"
                      onPress={this.pickImageHandler}
                    />
                  </View>
                </View>

                <TouchableHighlight
                  style={styles.Button}
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

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    justifyContent: "center"
  },
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: "5%"
  },
  Label: {
    alignSelf: "center",
    marginBottom: "3%",
    color: "black",
    fontSize: 18
  },
  Button: {
    alignSelf: "center",
    marginTop: "3%",
    borderWidth: 1,
    padding: 5
  },
  gallery: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});
