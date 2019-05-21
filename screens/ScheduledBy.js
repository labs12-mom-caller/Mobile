import React from "react";
import moment from "moment-timezone";
import styled from "styled-components";
import { firstNameOnly } from "../app/utils";
import { View, Text, Image } from "react-native";

const ScheduledCall = ({ contact, user }) => {
  return (
    <View>
      <View>
        <Text>Scheduled By</Text>
        <Text>On</Text>
        <Text>With</Text>
      </View>
      <View>
        <View>
          <Text>{firstNameOnly(contact.user1.displayName)}</Text>{" "}
          <Image
            source={
              contact.user1.photoUrl ||
              "https://raw.githubusercontent.com/labs12-mom-caller/Front-End/master/public/favicon.ico"
            }
          />
          <View>
            {/* <Link to={`/contact/${contact.id}/update`} state={{ contact }}>
              Update Call
            </Link> */}
          </View>
        </View>
        <Text>
          {moment(contact.created_at, "X")
            .tz(contact.timezone)
            .format("MMMM Do, YYYY")}
        </Text>
        <View>
          <Text>{firstNameOnly(contact.user2.displayName)}</Text>
          <Image
            source={
              contact.user2.photoUrl ||
              "https://raw.githubusercontent.com/labs12-mom-caller/Front-End/master/public/favicon.ico"
            }
          />
        </View>
      </View>
    </View>
  );
};

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;

//   header {
//     align-items: center;
//     text-align: center;
//     padding: 10px;

//     .schedule {
//       margin-left: 2rem;
//     }

//     .on {
//       margin-right: 3rem;
//     }

//     .with {
//       margin-right: 4.5rem;
//     }
//   }

//   main {
//     justify-content: space-between;
//     align-items: center;
//     padding: 2rem;
//     text-align: center;

//     img {
//       width: 100px;
//       border-radius: 100%;
//     }

//     .user {
//       height: 200px;
//       width: 120px;
//       padding: 2rem;
//       display: flex;
//       flex-direction: column;
//       justify-content: space-around;
//       align-items: center;
//     }

//     .userTwoImage {
//       margin-bottom: 3rem;
//     }
//   }
// `;

export default ScheduledCall;
