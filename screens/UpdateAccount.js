import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, Alert, ScrollView } from "react-native";
import {
  Card,
  ListItem,
  Button,
  Image,
  Form,
  Input,
  Label,
  ButtonGroup,
  Avatar
} from "react-native-elements";
import { Actions } from "react-native-router-flux";
import styled from "styled-components";
import { db, storage, auth } from "../constants/ApiKeys";
import * as firebase from "firebase";
import ImagePicker from "react-native-image-picker";

const options = {
  title: "Upload an image",
  storageOptions: {
    skipBackup: true,
    path: `user-profiles`
  }
};

const UpdateAccount = props => {
  const [displayName, setDisplayName] = useState(props.user.displayName);
  const [phoneNumber, setPhoneNumber] = useState(
    props.user.phoneNumber.replace("+1", "")
  );
  const [email, setEmail] = useState(props.user.email);
  const [correctPhone, setCorrectPhone] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [image, setImage] = useState(false);
  const [uploading, setUploading] = useState(null);
  const [imageInput, setImageInput] = useState(null);

  _handleImagePicked = async pickerResult => {
    try {
      setUploading(true);
      uploadUrl = await uploadImageAsync(pickerResult.uri);
      image.uploadUrl;
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      setUploading(false);
    }
  };

  uploadImageAsync = async uri => {
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

    const ref = firebase
      .storage()
      .ref(`user-profiles`)
      .child(props.user.uid)
      .child(props.user.uid);
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();
    const uploadedImage = await snapshot.ref.getDownloadURL();
    setUserPhoto(uploadedImage);
    // return uploadedImage;
  };

  setUserPhoto = async uploadedImage => {
    await db
      .doc(`users/${props.user.uid}`)
      .set(
        {
          photoUrl: uploadedImage
        },
        { merge: true }
      )
      .then(function() {
        // Update successful.
        console.log("success");
        Alert.alert("User Profile Image Changed");
        Actions.main();
      })
      .catch(function(error) {
        console.log("failed");
        // An error happened.
      });
  };

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
        _handleImagePicked(response);
      }
    });
  };

  const update = async () => {
    let formattedPhone = await String("+1").concat(
      String(phoneNumber).replace(/[^\d]/g, "")
    );

    if (Array.from(formattedPhone).length != 12) {
      Alert.alert("enter valid number");
      return;
    } else {
      //   Alert.alert("good number");
      console.log(formattedPhone, "from check");
    }

    await db
      .doc(`users/${props.user.uid}`)
      .set(
        {
          displayName,
          phoneNumber: formattedPhone,
          email
        },
        { merge: true }
      )
      .then(user => {
        Actions.main();
      });
  };

  if (props.user == null) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <Card title="Update your account">
        <View>
          <Avatar
            style={{ alignSelf: "center", width: 150, height: 150 }}
            source={{ uri: props.user.photoUrl }}
            size="xlarge"
            rounded
            activeOpacity={0.7}
          />
          <Image resizeMode="cover" source={{ uri: props.user.photoUrl }} />
          <View>
            <View />
            <Button
              title="Pick Image"
              onPress={pickImageHandler}
              containerStyle={{ alignSelf: "center", width: "45%" }}
              buttonStyle={{
                backgroundColor: "black",
                paddingHorizontal: 15,
                borderRadius: 5,
                height: 40,
                marginTop: 10
              }}
            />
          </View>
          {/* <Text>{props.user.displayName}</Text> */}
          <View>
            <Input
              style={{ width: 200, height: 40 }}
              leftIcon={<Icon name="user" size={18} color="black" />}
              value={displayName}
              onChangeText={text => {
                setDisplayName(text);
              }}
              placeholder="Display Name"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={{ paddingTop: 20 }} />
            <Input
              placeholder="Email"
              leftIcon={<Icon name="envelope" size={18} color="black" />}
              value={email}
              onChangeText={text => {
                setEmail(text);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={{ paddingTop: 20 }} />
            <Input
              style={{ width: 200, height: 40 }}
              leftIcon={<Icon name="phone" size={24} color="black" />}
              value={phoneNumber}
              onChangeText={text => {
                setPhoneNumber(text);
              }}
              placeholder="Phone Number"
            />
            <View style={{ paddingTop: 20 }} />
            <Button
              title="Update Profile"
              onPress={e => update(e)}
              containerStyle={{ alignSelf: "center", width: "45%" }}
              buttonStyle={{ backgroundColor: "green" }}
            />
          </View>
        </View>
      </Card>
    </ScrollView>
  );
};

export default UpdateAccount;
