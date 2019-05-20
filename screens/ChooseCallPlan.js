import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import styled from "styled-components";

const ChooseCallPlan = ({ contactId, userId }) => {
  const [free, setFree] = useState(null);
  const [paid, setPaid] = useState(null);

  const freeFrequency = e => {
    e.preventDefault();
    if (e.target.innerText === free) {
      setFree(null);
    } else {
      setFree(e.target.innerText);
    }
  };

  const paidFrequency = e => {
    e.preventDefault();
    if (e.target.innerText === paid) {
      setPaid(null);
    } else {
      setPaid(e.target.innerText);
    }
  };

  const selectFree = e => {
    e.preventDefault();
    navigate(`/choose/${userId}/${contactId}/${free}/schedule-free`);
  };

  const selectPaid = e => {
    e.preventDefault();
    navigate(`/choose/${userId}/${contactId}/${paid}/schedule`);
  };

  return (
    <Container>
      <Text>Choose your plan</Text>
      <Text>Don&apos;t worry, you can change this any time</Text>
      <View className="card-container">
        <View className="card">
          <Text>Up to 30 Minutes</Text>
          <Text>Let&apos;s catch up</Text>
          <Text>Pre-Scheduled</Text>
          <View className="frequency-wrap">
            <Button
              title="Bi-Weekly"
              type="outline"
              onPress={this.addCall}
              buttonStyle={{
                backgroundColor: "white",
                borderColor: "black",
                marginTop: 10,
                marginHorizontal: 5,
                width: 100
              }}
              titleStyle={{ color: "black" }}
            />
            {/* <Button
              type="button"
              className={
                paid === "Bi-Weekly" ? "frequency active" : "frequency"
              }
              onClick={paidFrequency}
            >
              Bi-Weekly
            </Button> */}
            <Button
              title="Monthly"
              type="outline"
              onPress={this.addCall}
              buttonStyle={{
                backgroundColor: "white",
                borderColor: "black",
                marginTop: 10,
                marginHorizontal: 5,
                width: 100
              }}
              titleStyle={{ color: "black" }}
            />
            {/* <Button
              type="button"
              className={paid === "Monthly" ? "frequency active" : "frequency"}
              onClick={paidFrequency}
            >
              Monthly
            </Button> */}
          </View>
          <Text>{paid === "Bi-Weekly" ? "$5.00" : "$2.50"} per month</Text>
          <Button
            title="Choose Plan"
            type="outline"
            onPress={this.addCall}
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "black",
              marginTop: 10,
              marginHorizontal: 5,
              width: 100
            }}
            titleStyle={{ color: "black" }}
          />
          {/* <Button type="button" disabled={!paid} onClick={selectPaid}>
            Choose Plan
          </Button> */}
        </View>
        <View className="card">
          <Text>Up to 10 Minutes</Text>
          <Text>Just saying &quot;Hi&quot;</Text>
          <Text>Randomly Scheduled</Text>
          <View className="frequency-wrap">
            <Button
              title="Bi-Weekly"
              type="outline"
              onPress={this.addCall}
              buttonStyle={{
                backgroundColor: "white",
                borderColor: "black",
                marginTop: 10,
                marginHorizontal: 5,
                width: 100
              }}
              titleStyle={{ color: "black" }}
            />
            {/* <Button
              type="button"
              className={
                free === "Bi-Weekly" ? "frequency active" : "frequency"
              }
              onClick={freeFrequency}
            >
              Bi-Weekly
            </Button> */}
            <Button
              title="Monthly"
              type="outline"
              onPress={this.addCall}
              buttonStyle={{
                backgroundColor: "white",
                borderColor: "black",
                marginTop: 10,
                marginHorizontal: 5,
                width: 100
              }}
              titleStyle={{ color: "black" }}
            />
            {/* <Button
              type="button"
              className={free === "Monthly" ? "frequency active" : "frequency"}
              onClick={freeFrequency}
            >
              Monthly
            </Button> */}
          </View>
          <Text>Free</Text>
          <Button
            title="Choose Plan"
            type="outline"
            onPress={this.addCall}
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "black",
              marginTop: 10,
              marginHorizontal: 5,
              width: 100
            }}
            titleStyle={{ color: "black" }}
          />
          {/* <Button type="button" disabled={!free} onClick={selectFree}>
            Choose Plan
          </Button> */}
        </View>
      </View>
    </Container>
  );
};

export default ChooseCallPlan;

const Container = styled.View`
  border: 1px solid purple;
`;
