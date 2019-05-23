import React from "react";
import moment from "moment-timezone";
import styled from "styled-components";
import { firstNameOnly } from "../app/utils";
import { View, Text, Image } from "react-native";

const ScheduledCall = ({ contact, user }) => {
  return (
    <View>
      <Info>Next Call</Info>
      <Info>
        {moment(contact.created_at, "X")
          .tz(contact.timezone)
          .format("MMMM Do, YYYY")}
      </Info>
    </View>
  );
};

const Container = styled.View``;
const Info = styled.Text`
  color: white;
  font-size: 30;
  text-align: center;
  font-weight: 600;
  margin: 3% auto;
`;

export default ScheduledCall;
