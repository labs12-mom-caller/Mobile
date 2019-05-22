import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import moment from "moment-timezone";
import styled from "styled-components";
import { Actions } from "react-native-router-flux";
import { fetchDoc } from "../app/utils";

const CallConfirmation = ({ contactId }) => {
  const [contact, setContact] = useState({
    next_call: "",
    timezone: "",
    fetched: false
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedContact = await fetchDoc(`/contacts/${contactId}`);
        const formatted = moment(fetchedContact.next_call, "X")
          .tz(fetchedContact.timezone)
          .format();
        console.log(formatted);
        setContact({
          next_call: formatted,
          timezone: fetchedContact.timezone,
          fetched: true
        });
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [contactId]);

  const goToDashboard = e => {
    e.preventDefault();
    Actions.main({ type: "reset" });
    // navigate("/");
  };

  return contact.fetched ? (
    <View>
      <View>
        <Text>You&apos;re all set!</Text>
        <Text>
          You&apos;ll receive an email shortly confirming your subscription.
        </Text>
        <View>
          <Text>Call Details</Text>
          <Text>Your first call is scheduled for:</Text>
          {contact && (
            <View>
              <Text>{moment(contact.next_call).format("dddd")}</Text>
              <Text>
                {moment
                  .tz(contact.next_call, contact.timezone)
                  .format("MMMM Do")}
              </Text>
              <Text>
                {moment
                  .tz(contact.next_call, contact.timezone)
                  .format("h:mm a")}
              </Text>
            </View>
          )}
        </View>
        <Button onPress={goToDashboard} title="Continue to Dashboard" />
      </View>
    </View>
  ) : (
    <Text>Loading...</Text>
  );
};

export default CallConfirmation;
