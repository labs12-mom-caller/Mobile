import React from "react";
import moment from "moment-timezone";
import styled from "styled-components";
import { View, Text } from "react-native";

const PreviousCallsWithContact = ({ calls, contact, user }) => {
  return (
    <>
      <View>
        <Text>Previous Calls</Text>
      </View>
      {calls.length > 0 ? (
        calls.map(call => {
          return (
            <View key={call.id}>
              <Text>
                {moment(call.call_time, "X")
                  .tz(contact.timezone)
                  .format("MMMM Do, YY [at] h:mm A")}
              </Text>
              <Text>Call duration: {call.call_duration} seconds</Text>
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

// PreviousCallsWithContact.propTypes = {
//   contact: PropTypes.object,
//   calls: PropTypes.array,
//   user: PropTypes.shape({
//     displayName: PropTypes.string,
//     email: PropTypes.string,
//     photoUrl: PropTypes.string,
//     uid: PropTypes.string,
//     phoneNumber: PropTypes.string
//   })
// };

// const Card = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   align-items: center;
//   transition: box-shadow 0.3s;
//   width: 100%;
//   border-radius: 6px;
//   background: #fff;
//   box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
//   transition: box-shadow 0.5s;
//   padding: 2rem;
//   &:hover {
//     box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
//   }
// `;
