import React from "react";
import moment from "moment-timezone";
import styled from "styled-components";
import { firstNameOnly } from "../app/utils";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import profileImage from "../assets/recaller.png";

const ScheduledCall = ({ contact, user }) => {
  return (
    <Container>
      <Sby>
        <Info style={{ fontSize: 40 }}>Scheduled By</Info>
      </Sby>
      <Info>{firstNameOnly(contact.user1.displayName)}</Info>
      {contact.user1.photoUrl ? (
        <Avatar
          rounded
          source={{
            uri: contact.user1.photoUrl
          }}
          size="xlarge"
        />
      ) : (
        <Avatar rounded source={profileImage} size="xlarge" />
      )}
      <View>
        {/* <Link to={`/contact/${contact.id}/update`} state={{ contact }}>
              Update Call
            </Link> */}
      </View>
      <Container>
        <Info style={{ fontSize: 40 }}>With</Info>
        <Info>{firstNameOnly(contact.user2.displayName)}</Info>
        {contact.user2.photoUrl ? (
          <Avatar
            rounded
            source={{
              uri: contact.user2.photoUrl
            }}
            size="xlarge"
          />
        ) : (
          <Avatar rounded source={profileImage} size="xlarge" />
        )}
        <Info style={{ margin: 10 }}>
          {moment(contact.created_at, "X")
            .tz(contact.timezone)
            .format("MMMM Do, YYYY")}
        </Info>
      </Container>
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
  justify-content: center;
  min-width: 90%;
  /* border: 1px solid purple; */
  padding: 15px;
  /* background: black; */
  /* opacity: 0.8; */
`;

const Sby = styled.View`
  flex-direction: row;
  /* border: 1px solid blue; */
  min-width: 100%;
  justify-content: center;
`;

// const SbyOnWith = styled.View`
//   flex-direction: row;
//   border: 1px solid blue;
//   min-width: 100%;
//   justify-content: space-evenly;
// `;

// const WhoonWho = styled.View`
//   flex-direction: row;
//   min-width: 100%;
//   border: 1px solid red;
//   justify-content: space-evenly;
// `;

const Info = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 30;
  margin: 3% auto;
`;

export default ScheduledCall;
