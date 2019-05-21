import React from "react";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import moment from "moment-timezone";

import { formatPhoneNumber } from "../app/utils";

import { db } from "../constants/ApiKeys";
// console.log(calls, "from calls");
const CallRecord = ({ callId }) => {
  console.log(callId, "from user contact");
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
      <View key={call.id}>
        <View>
          <View>
            <Image
              src={
                contact.photoUrl ||
                "https://raw.githubusercontent.com/labs12-mom-caller/Front-End/master/public/favicon.ico"
              }
              alt={contact.displayName}
            />
            <View>
              <Text>Previous Call</Text>
              <Text>on</Text>
              <Text>
                {moment(call.call_time, "X").format(
                  "dddd, MMMM Do [at] h:mm A"
                )}
              </Text>
              <Text>with</Text>
            </View>
            <View>
              <Text>{contact.displayName}</Text>
              <Text>{contact.email}</Text>
              <Text>{formatPhoneBNumber(contact.phoneNumber)}</Text>
              {/* <Button title='Go Back' onPress={} /> */}
            </View>
          </View>
        </View>
        <View>
          <View>
            <Text>Call Record</Text>
            <View>
              {/* <Audio controls>
                <source src={call.audio} type='audio/wav' />
                <track kind='captions' />
                Your browser does not support the audio element
              </Audio> */}
              <Text>Transcript</Text>
              <View>
                {call.simplified &&
                  call.simplified.map(line => {
                    return (
                      <View>
                        <Text>{line.user}</Text>
                        <Text>{line.script}</Text>
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  );
};

export default CallRecord;
