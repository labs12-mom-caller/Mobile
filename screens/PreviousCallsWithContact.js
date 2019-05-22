import React from "react";
import moment from "moment-timezone";
import styled from "styled-components";
import { View, Text } from "react-native";

const PreviousCallsWithContact = ({ calls, contact, user }) => {
  return (
    <>
      <View>
        <Info>Previous Calls</Info>
      </View>
      {calls.length > 0 ? (
        calls.map(call => {
          return (
            <View key={call.id}>
              <Info>
                {moment(call.call_time, "X")
                  .tz(contact.timezone)
                  .format("MMMM Do, YY [at] h:mm A")}
              </Info>
              <Info>Call duration: {call.call_duration} seconds</Info>
              {/* <Link to={`/prev-calls/${user.uid}/${call.id}`}>Review Call</Link> */}
            </View>
          );
        })
      ) : (
        <View>
          <Text>You have no previous calls with this contact</Text>
        </View>
      )}
    </>
  );
};

export default PreviousCallsWithContact;

const Info = styled.Text`
  color: white;
  font-size: 30;
  font-weight: 600;
  text-align: center;
  margin: 3% auto;
`;
