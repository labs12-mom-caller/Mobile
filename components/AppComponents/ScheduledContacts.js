/* eslint-disable no-inner-declarations */
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Content, List, ListItem, Text, Left, Right } from "native-base";
import { Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { firstNameOnly } from "../../app/utils";
import profileImage from "../../assets/recaller.png";
import moment from "moment";
import { db } from "../../constants/ApiKeys";
import { Actions } from "react-native-router-flux";

const ScheduledContacts = ({ user }) => {
  const [contacts, setContacts] = React.useState([]);
  //   console.log(contacts);
  const { uid } = user;
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userContacts = await db
          .collection("contacts")
          .where("user1", "==", db.doc(`users/${uid}`))
          .get();
        userContacts.forEach(async doc => {
          try {
            const user2Snap = await db
              .doc(`users/${doc.data().user2.id}`)
              .get();
            const contact = {
              user2: {
                ...user2Snap.data(),
                id: user2Snap.id
              },
              call_frequency: doc.data().call_frequency,
              next_call: doc.data().next_call,
              time_zone: doc.data().timezone,
              id: doc.id
            };
            setContacts(contacts => [...contacts, contact]);
          } catch (err) {
            console.log(err);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [uid]);

  // const goCallInfo = () => {
  //   Actions.contactinfo({ user, contactId });
  // };

  console.log(contacts, "from contacts");

  const goCallInfo = c => {
    Actions.contactinfo({
      user,
      contactId: c.id
    });
  };

  return (
    <View style={styles.Wrapper}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginRight: "10%"
        }}
      >
        <Text>Name</Text>
        <Text>Date</Text>
        <Text>Time</Text>
        {/* <Text>{moment(1558332000).format()}</Text> */}
      </View>
      {contacts &&
        contacts.map(c => {
          return (
            <Content key={c.user2.uid}>
              <List
                style={{
                  flexDirection: "column"
                }}
              >
                <ListItem onPress={() => goCallInfo(c)} selected>
                  <Left>
                    {c.user2.photoUrl ? (
                      <Avatar
                        rounded
                        source={{
                          uri: c.user2.photoUrl
                        }}
                        size="small"
                      />
                    ) : (
                      <Avatar rounded source={profileImage} size="small" />
                    )}
                    <Text style={{ marginLeft: 10 }}>
                      {firstNameOnly(c.user2.displayName)}
                    </Text>
                  </Left>
                  <Right>
                    <View
                      style={{
                        justifyContent: "space-evenly",
                        flexDirection: "row",
                        width: 250
                      }}
                    >
                      <Text>{moment(c.next_call, "X").format(`MMMM Do`)}</Text>
                      <Text>{moment(c.next_call, "X").format(`h:mm A`)} </Text>
                      <Icon style={{ marginLeft: 20 }} name="info" />
                    </View>
                  </Right>
                </ListItem>
              </List>
            </Content>
          );
        })}
    </View>
  );
};

export default ScheduledContacts;

const styles = StyleSheet.create({
  Wrapper: {
    flexDirection: "column"
    // justifyContent: "space-around",
    // flex: 1,
    // borderWidth: 1,
    // borderColor: "#cecece",
    // alignItems: "center",
    // width: "100%",
    // color: "#7d7d7d",
    // backgroundColor: "#cecece",
    // height: "40%",
    // padding: 5
  },
  Contact: {
    flex: 1,
    justifyContent: "space-around"
  }
});
