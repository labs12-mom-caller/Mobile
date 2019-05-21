import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import moment from "moment";
import { db } from "../../constants/ApiKeys";
// import { firstNameOnly } from "../../app/utils";
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

  const getFirst = name => {
    const splitName = name.split(" ");
    return splitName[0];
  };

  // goPrevCalls = () => {
  //   this.props.navigation.navigate("PrevCalls");
  // };

  if (calls.empty) return <Text>No Calls Available...</Text>;

  // console.log(calls, "from calls");
  // console.log(userId, "from user id calls");

  const gotoCall = (userId, call) => {
    Actions.callinfo({ userId, callId: call.id });
  };

  return (
    <View style={styles.Wrapper}>
      {calls &&
        calls.map(call => (
          <View>
            {console.log(call.id, "from render")}
            <View style={styles.Name}>
              <Text>{getFirst(call.user2.displayName)}</Text>
              <View style={styles.placeholder}>
                <Image
                  source={call.user2.photoUrl || profileImage}
                  style={{ height: 60, width: 60, flex: 1 }}
                />
              </View>
            </View>
            <View>
              <Text>{moment(call.call_time).format("MMM DD - h:mm A")}</Text>
              <Text>
                {call.deepgram &&
                  call.deepgram.results.channels[0].alternatives[0]
                    .transcript &&
                  call.deepgram.results.channels[0].alternatives[0].transcript}
              </Text>
            </View>
          </View>
        ))}
    </View>
  );
};
export default PreviousCalls;

const styles = StyleSheet.create({
  Wrapper: {
    flexDirection: "row",
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
    backgroundColor: "#eee",
    // width: "20%",
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
  }
});
