/* eslint-disable no-inner-declarations */
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon
} from "native-base";

import { db } from "../../constants/ApiKeys";

const ScheduledContacts = ({ user }) => {
  const [contacts, setContacts] = React.useState([]);
  console.log(contacts);
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

  const goContacts = () => {
    this.props.navigation.navigate("Contact");
  };

  //   console.log(contacts[1], "from user 2")

  return (
    <View style={styles.Wrapper}>
      {/* <View>
        <Text>Name</Text>
        <Text style={{ marginTop: "10%" }}>Upcoming Call</Text>
      </View> */}
      {contacts &&
        contacts.map(c => {
          return (
            // <View>
            //   <View style={styles.Contact}>
            //     <Text>{c.user2.displayName}</Text>
            //     <Text>
            //       {moment(c.next_call, "X")
            //         // .tz(c.time_zone)
            //         .format(`MMMM Do`)}
            //     </Text>
            //     <Text style={{ marginLeft: "5%" }}>
            //       {moment(c.next_call, "X")
            //         // .tz(c.time_zone)
            //         .format(`h:mm A`)}
            //     </Text>
            //     <View />
            //   </View>
            // </View>
            <Content>
              <List style={{ flexDirection: "column" }}>
                <ListItem selected>
                  <Left>
                    <Text onPress={this.goContacts}>{c.user2.displayName}</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
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
