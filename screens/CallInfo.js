import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ImageBackground
} from "react-native";
import { Button, Avatar } from "react-native-elements";
import moment from "moment-timezone";
import profileImage from "../assets/recaller.png";
import styled from "styled-components";

import { formatPhoneNumber } from "../app/utils";

import { db } from "../constants/ApiKeys";

const CallRecord = ({ callId }) => {
  const [call, setCall] = React.useState(null);
  const [contact, setContact] = React.useState(null);
  const [callInfo, setCallInfo] = React.useState(null);

  React.useEffect(() => {
    return db.doc(`calls/${callId}`).onSnapshot(document => {
      setCall({
        ...document.data(),
        id: document.id
      });
      console.log(call);
    });
  }, [callId]);

  React.useEffect(() => {
    if (call) {
      function fetchCallInfo() {
        call.contact_ref.get().then(doc => {
          if (doc.exists) {
            setCallInfo({
              ...doc.data(),
              id: doc.id
            });
          }
        });
      }
      fetchCallInfo();
    }
  }, [call]);
  React.useEffect(() => {
    if (callInfo) {
      function fetchContact() {
        callInfo.user2.get().then(doc => {
          if (doc.exists) {
            setContact({
              ...doc.data(),
              id: doc.id
            });
          }
        });
      }
      fetchContact();
    }
  }, [callInfo]);
  if (!call) return <Text>Loading..</Text>;
  if (!callInfo) return <Text>...</Text>;
  if (!contact) return <Text>...</Text>;
  console.log(call);
  return (
    call && (
      <ImageBackground
        source={require("../assets/girlPhone.jpg")}
        style={styles.Wrapper}
        imageStyle={{
          resizeMode: "cover"
        }}
      >
        <ScrollView key={call.id}>
          <Container>
            <ContainerTop>
              {contact.photoUrl ? (
                <Avatar
                  rounded
                  containerStyle={{ marginTop: 100 }}
                  source={{
                    uri: contact.photoUrl
                  }}
                  size="xlarge"
                />
              ) : (
                <Avatar rounded source={profileImage} size="xlarge" />
              )}
              <View>
                <Info>Previous Call</Info>
                <Info>on</Info>
                <Info>
                  {moment(call.call_time, "X").format(
                    "dddd, MMMM Do [at] h:mm A"
                  )}
                </Info>
                <Info>with</Info>
              </View>
              <View>
                <Info>{contact.displayName}</Info>
                <Info>{contact.email}</Info>
                <Info>{formatPhoneNumber(contact.phoneNumber)}</Info>
                {/* <Button title='Go Back' onPress={} /> */}
              </View>
            </ContainerTop>
            <Container>
              <View>
                <Info>Call Record</Info>
                <View>
                  {/* <Audio controls>
                <source src={call.audio} type='audio/wav' />
                <track kind='captions' />
                Your browser does not support the audio element
              </Audio> */}
                  <Info>Transcript</Info>
                  <View
                    style={{
                      flexDirection: "row",
                      // justifyContent: "space-evenly",
                      width: "100%"
                    }}
                  />
                  <View>
                    {call.simplified &&
                      call.simplified.map(line => {
                        return (
                          <TransContainer>
                            <Info2>{line.user}</Info2>
                            <Info1>{line.script}</Info1>
                          </TransContainer>
                        );
                      })}
                  </View>
                </View>
              </View>
            </Container>
          </Container>
        </ScrollView>
      </ImageBackground>
    )
  );
};

export default CallRecord;

const Container = styled.View`
  align-items: center;
  /* border: 1px solid green; */
  background: #1d1d1d;
  opacity: 0.9;
  justify-content: center;
`;

const ContainerTop = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 3%;
  padding: 6%;
`;

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: "rgba(0, 0, 44, 0.2)",
    width: "100%",
    height: "100%",
    // alignItems: "center",
    justifyContent: "center"
  }
});

const Info = styled.Text`
  color: white;
  font-size: 25;
  font-weight: 600;
  text-align: center;
`;

const Info2 = styled.Text`
  color: white;
  text-decoration: underline;
  font-size: 24;
  font-weight: 500;
  text-align: left;
`;

const Info1 = styled(Info2)`
  text-align: right;
  text-decoration: none;
  font-size: 22;
  font-weight: 100;
  color: white;
`;

const TransContainer = styled.View`
  width: 97%;
  margin: 0 auto;
`;
