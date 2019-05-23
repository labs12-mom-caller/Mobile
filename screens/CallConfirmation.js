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
    <View style={{ alignItems: "center", marginTop: 50 }}>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 10,
            alignSelf: "center",
            textAlign: "center"
          }}
        >
          You&apos;re all set!
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 10,
            width: 300,
            alignSelf: "center",
            textAlign: "center"
          }}
        >
          You&apos;ll receive an email shortly confirming your subscription.
        </Text>
        <View>
          <Text style={{ fontSize: 20, marginBottom: 10, alignSelf: "center" }}>
            Call Details
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 10,
              width: 300,
              alignSelf: "center",
              textAlign: "center"
            }}
          >
            Your first call is scheduled for:
          </Text>
          {contact && (
            <View style={{ justifyContent: "center", alignSelf: "center" }}>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 10,
                  width: 300,
                  alignSelf: "center",
                  textAlign: "center"
                }}
              >
                {moment(contact.next_call).format("dddd")}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 10,
                  width: 300,
                  alignSelf: "center",
                  textAlign: "center"
                }}
              >
                {moment
                  .tz(contact.next_call, contact.timezone)
                  .format("MMMM Do")}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 25,
                  width: 300,
                  alignSelf: "center",
                  textAlign: "center"
                }}
              >
                {moment
                  .tz(contact.next_call, contact.timezone)
                  .format("h:mm a")}
              </Text>
            </View>
          )}
        </View>
        <Button
          title="Continue to Dashboard"
          type="solid"
          onPress={goToDashboard}
          containerStyle={{ width: 150, alignSelf: "center" }}
          buttonStyle={{
            borderColor: "black",
            borderWidth: 1.5,
            backgroundColor: "white",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            // borderRadius: 10,
            padding: 5,
            height: 40
          }}
          titleStyle={{ color: "white" }}
        />
      </View>
    </View>
  ) : (
    <Text>Loading...</Text>
  );
};

export default CallConfirmation;
