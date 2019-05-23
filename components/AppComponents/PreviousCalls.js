import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { ListItem } from "native-base";
import { Avatar } from "react-native-elements";
import moment from "moment";
import { db } from "../../constants/ApiKeys";
import { firstNameOnly } from "../../app/utils";
import profileImage from "../../assets/recaller.png";
import { Actions } from "react-native-router-flux";
// import deepgram from "../../assets/images/deepgram-logo.svg";

const PreviousCalls = ({ userId }) => {
  const [calls, setCalls] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const user = await db.collection("users").doc(userId);
      const userContacts = await db
        .collection("contacts")
        .where("user1", "==", user)
        .get();
      await userContacts.forEach(async doc => {
        const allCalls = await db
          .collection("calls")
          .where("contact_ref", "==", doc.ref)
          .where("fetched", "==", true)
          .get();
        console.log(allCalls, "from all calls");
        if (!allCalls.empty) {
          const user2 = await doc.data().user2.get();
          allCalls.forEach(async callDoc => {
            const callData = {
              id: callDoc.id,
              user2: user2.data(),
              contactId: doc.id,
              call_duration: callDoc.data().call_duration,
              call_time: moment(callDoc.data().call_time, "X").format(),
              deepgram: callDoc.data().deepgram
            };
            setCalls(c => [...c, callData]);
          });
        }
      });
    };
    fetchData();
  }, [userId]);

  // goPrevCalls = () => {
  //   this.props.navigation.navigate("PrevCalls");
  // };

  if (calls.empty) return <Text>No Calls Available...</Text>;

  // console.log(calls, "from calls");
  // console.log(userId, "from user id calls");

  const gotoCall = call => {
    Actions.callinfo({ userId, callId: call.id });
  };

  return (
    <View style={styles.Wrapper}>
      {calls &&
        calls.map(call => (
          <ListItem onPress={() => gotoCall(call)} style={styles.Contacts}>
            <View style={styles.Name}>
              <Text style={{ marginBottom: 5, textAlign: "center" }}>
                {firstNameOnly(call.user2.displayName)}
              </Text>
              <View style={styles.placeholder}>
                {call.user2.photoUrl ? (
                  <Avatar
                    rounded
                    size="medium"
                    source={{ uri: call.user2.photoUrl }}
                  />
                ) : (
                  <Avatar rounded size="medium" source={profileImage} />
                )}
              </View>
            </View>
            <View>
              <Text>{moment(call.call_time).format("MMM DD - h:mm A")}</Text>
              <Text style={{ width: 250, height: 50, overflow: "hidden" }}>
                {call.deepgram &&
                  call.deepgram.results.channels[0].alternatives[0]
                    .transcript &&
                  call.deepgram.results.channels[0].alternatives[0].transcript}
              </Text>
              <Text
                style={{ color: "blue", marginTop: 25, paddingTop: 0 }}
                onPress={() => gotoCall(call)}
              >
                Click to View
              </Text>
            </View>
          </ListItem>
        ))}
    </View>
  );
};
export default PreviousCalls;

const styles = StyleSheet.create({
  Wrapper: {
    justifyContent: "space-around",
    flex: 1
  },
  Contact: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    marginLeft: 25
  },
  placeholder: {
    borderColor: "black",
    // backgroundColor: "#eee",
    width: "100%",
    height: 60
  },
  previewImage: {
    width: "100%",
    height: "100%"
  },
  Name: {
    marginRight: "10%",
    marginBottom: "10%",
    textAlign: "center"
  },
  Contacts: {
    flexDirection: "row",
    width: "90%"
  }
});
