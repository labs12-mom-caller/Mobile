import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../constants/ApiKeys";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView
} from "react-native";
import { Button } from "react-native-elements";
import ScheduledBy from "./ScheduledBy";
import NextCall from "./NextCall";
import PreviousCallsWithContact from "./PreviousCallsWithContact";
import { Actions } from "react-native-router-flux";

const ContactInfo = ({ contactId, user }) => {
  const [contact, setContact] = useState({});
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const contactSnap = await db.doc(`contacts/${contactId}`).get();
      const user1Snap = await db
        .doc(`users/${contactSnap.data().user1.id}`)
        .get();
      const user2Snap = await db
        .doc(`users/${contactSnap.data().user2.id}`)
        .get();
      setContact({
        id: contactId,
        ...contactSnap.data(),
        user1: {
          ...user1Snap.data()
        },
        user2: {
          ...user2Snap.data()
        },
        fetched: true
      });
      const callSnaps = await db
        .collection("calls")
        .where("contact_ref", "==", db.doc(`contacts/${contactId}`))
        .get();
      callSnaps.forEach(doc => {
        const callData = {
          call_duration: doc.data().call_duration,
          call_time: doc.data().call_time,
          id: doc.id
        };
        setCalls(calls => [...calls, callData]);
      });
    };
    fetchData();
  }, [contactId]);

  console.log(calls);
  return contact.fetched ? (
    <Container>
      <ScrollView>
        <ImageBackground
          source={require("../assets/bgImage.jpg")}
          style={styles.Wrapper}
          imageStyle={{
            resizeMode: "cover"
          }}
        >
          <Container>
            <View>
              <View>
                <ScheduledBy contact={contact} user={user} />
              </View>
            </View>

            <View>
              <View>
                <NextCall contact={contact} />
              </View>
            </View>

            <View>
              <PreviousCallsWithContact
                calls={calls}
                contact={contact}
                user={user}
              />
              <Button
                title="Go Back"
                onPress={() => Actions.pop()}
                type="outline"
                buttonStyle={{
                  backgroundColor: "white",
                  borderColor: "black",
                  marginTop: 10,
                  marginBottom: 10,
                  marginRight: "auto",
                  marginLeft: "auto",
                  // marginHorizontal: 5,
                  alignItems: "center",
                  width: 250
                }}
                titleStyle={{ color: "black" }}
              />
            </View>
          </Container>
        </ImageBackground>
      </ScrollView>
    </Container>
  ) : (
    <Text>Loading...</Text>
  );
};

export default ContactInfo;

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: "rgba(0, 0, 44, 0.8)",
    width: "100%",
    height: "100%",
    alignItems: "center"
    // justifyContent: "center"
    // backgroundColor: "black"
  }
});

const Container = styled.View`
  background: #1d1d1d;
  opacity: 0.9;
  /* justify-content: center; */
  align-items: center;
`;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   width: 100%;
//   margin: 2rem auto;
//   font-family: Roboto, helvetica;
// `;

// const ScheduledByContainer = styled.div`
//   font-size: 1.5rem;
//   width: 50%;
//   margin: 2rem auto;
//   min-width: 400px;

//   @media (max-width: 415px) {
//     min-width: auto;
//     width: 100%;
//   }

//   header {
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//   }
// `;

// const NextCallContainer = styled.div`
//   font-size: 1.5rem;
//   width: 50%;
//   margin: 2rem auto;
//   min-width: 400px;

//   @media (max-width: 415px) {
//     min-width: auto;
//     width: 100%;
//   }
// `;

// const PreviousCallsWithContactContainer = styled.div`
// font-size: 1.5rem;
// width: 50%;
// margin: 2rem auto;
// min-width: 400px;

// @media (max-width: 415px) {
//   min-width: auto;
//   width: 100%;
//   }

//   header {
//       width: 100%
//       background-color: #C4C4C4;
//       display: flex;
//       justify-content: space-around;
//     }
//   div {
//     margin: 10px auto;
//   }
// `;
