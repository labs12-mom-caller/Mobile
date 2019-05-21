import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import styled from "styled-components";
import { Actions } from "react-native-router-flux";

const ChooseCallPlan = ({ contactId, userId }) => {
  const [free, setFree] = useState(null);
  const [paid, setPaid] = useState(null);
  const [show, setShow] = useState(false);

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

  const freecall = () => {
    Actions.schedulefreecall();
  };

  const showBtns = () => {
    setShow(!show);
  };

  return (
    <ScrollView>
      {show ? (
        <Container>
          <ChooseText className="choose">Choose your plan</ChooseText>
          <SubChoose>Don&apos;t worry, you can change this any time</SubChoose>
          <Info>Up to 30 Minutes</Info>
          <Info>Let&apos;s catch up</Info>
          <Info>Pre-Scheduled</Info>
          <PlanOptions onPress={showBtns}>Plan Options</PlanOptions>
          {show && (
            <Card>
              <ButtonContainer>
                <Button
                  title="Bi-Weekly"
                  type="outline"
                  onPress={this.addCall}
                  buttonStyle={{
                    backgroundColor: "black",
                    borderColor: "white",
                    marginTop: 10,
                    marginHorizontal: 5,
                    width: 100
                  }}
                  titleStyle={{ color: "white" }}
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
                    backgroundColor: "black",
                    borderColor: "white",
                    marginTop: 10,
                    marginHorizontal: 5,
                    width: 100
                  }}
                  titleStyle={{ color: "white" }}
                />
                {/* <Button
              type="button"
              className={paid === "Monthly" ? "frequency active" : "frequency"}
              onClick={paidFrequency}
            >
              Monthly
            </Button> */}
              </ButtonContainer>
              <Price>
                {paid === "Bi-Weekly" ? "$5.00" : "$2.50"} per month
              </Price>
              <Button
                title="Choose Plan"
                type="outline"
                onPress={this.addCall}
                buttonStyle={{
                  backgroundColor: "red",
                  borderColor: "white",
                  marginTop: 10,
                  marginHorizontal: 5,
                  width: 150,
                  alignSelf: "center"
                }}
                titleStyle={{ color: "white" }}
              />
            </Card>
          )}
          {/* <Button type="button" disabled={!paid} onClick={selectPaid}>
            Choose Plan
          </Button> */}
          <Info>Up to 10 Minutes</Info>
          <Info>Just saying &quot;Hi&quot;</Info>
          <Info>Randomly Scheduled</Info>
          {show && (
            <Card>
              <ButtonContainer>
                <Button
                  title="Bi-Weekly"
                  type="outline"
                  onPress={this.addCall}
                  buttonStyle={{
                    backgroundColor: "black",
                    borderColor: "white",
                    marginTop: 10,
                    marginHorizontal: 5,
                    width: 100
                  }}
                  titleStyle={{ color: "white" }}
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
                    backgroundColor: "black",
                    borderColor: "white",
                    marginTop: 10,
                    marginHorizontal: 5,
                    width: 100
                  }}
                  titleStyle={{ color: "white" }}
                />
                {/* <Button
              type="button"
              className={free === "Monthly" ? "frequency active" : "frequency"}
              onClick={freeFrequency}
            >
              Monthly
            </Button> */}
              </ButtonContainer>
              <Price>Free</Price>
              <Button
                title="Choose Plan"
                type="outline"
                onPress={freecall}
                buttonStyle={{
                  backgroundColor: "red",
                  borderColor: "white",
                  marginTop: 10,
                  marginHorizontal: 5,
                  width: 150,
                  alignSelf: "center"
                }}
                titleStyle={{ color: "white" }}
              />
            </Card>
          )}
          {/* <Button type="button" disabled={!free} onClick={selectFree}>
            Choose Plan
          </Button> */}
        </Container>
      ) : (
        <FalseContainer>
          <ChooseText className="choose">Choose your plan</ChooseText>
          <SubChoose>Don&apos;t worry, you can change this any time</SubChoose>
          <Info>Up to 30 Minutes</Info>
          <Info>Let&apos;s catch up</Info>
          <Info>Pre-Scheduled</Info>
          <PlanOptions onPress={showBtns}>Plan Options</PlanOptions>
          {show && (
            <Card>
              <ButtonContainer>
                <Button
                  title="Bi-Weekly"
                  type="outline"
                  onPress={this.addCall}
                  buttonStyle={{
                    backgroundColor: "black",
                    borderColor: "white",
                    marginTop: 10,
                    marginHorizontal: 5,
                    width: 100
                  }}
                  titleStyle={{ color: "white" }}
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
                    backgroundColor: "black",
                    borderColor: "white",
                    marginTop: 10,
                    marginHorizontal: 5,
                    width: 100
                  }}
                  titleStyle={{ color: "white" }}
                />
                {/* <Button
              type="button"
              className={paid === "Monthly" ? "frequency active" : "frequency"}
              onClick={paidFrequency}
            >
              Monthly
            </Button> */}
              </ButtonContainer>
              <Price>
                {paid === "Bi-Weekly" ? "$5.00" : "$2.50"} per month
              </Price>
              <Button
                title="Choose Plan"
                type="outline"
                onPress={this.addCall}
                buttonStyle={{
                  backgroundColor: "red",
                  borderColor: "white",
                  marginTop: 10,
                  marginHorizontal: 5,
                  width: 150,
                  alignSelf: "center"
                }}
                titleStyle={{ color: "white" }}
              />
            </Card>
          )}
          {/* <Button type="button" disabled={!paid} onClick={selectPaid}>
            Choose Plan
          </Button> */}
          <Info>Up to 10 Minutes</Info>
          <Info>Just saying &quot;Hi&quot;</Info>
          <Info>Randomly Scheduled</Info>
          {show && (
            <Card>
              <ButtonContainer>
                <Button
                  title="Bi-Weekly"
                  type="outline"
                  onPress={this.addCall}
                  buttonStyle={{
                    backgroundColor: "black",
                    borderColor: "white",
                    marginTop: 10,
                    marginHorizontal: 5,
                    width: 100
                  }}
                  titleStyle={{ color: "white" }}
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
                    backgroundColor: "black",
                    borderColor: "white",
                    marginTop: 10,
                    marginHorizontal: 5,
                    width: 100
                  }}
                  titleStyle={{ color: "white" }}
                />
                {/* <Button
              type="button"
              className={free === "Monthly" ? "frequency active" : "frequency"}
              onClick={freeFrequency}
            >
              Monthly
            </Button> */}
              </ButtonContainer>
              <Price>Free</Price>
              <Button
                title="Choose Plan"
                type="outline"
                onPress={freecall}
                buttonStyle={{
                  backgroundColor: "red",
                  borderColor: "white",
                  marginTop: 10,
                  marginHorizontal: 5,
                  width: 150,
                  alignSelf: "center"
                }}
                titleStyle={{ color: "white" }}
              />
            </Card>
          )}
          {/* <Button type="button" disabled={!free} onClick={selectFree}>
            Choose Plan
          </Button> */}
        </FalseContainer>
      )}
    </ScrollView>
  );
};

export default ChooseCallPlan;

const Container = styled.View`
  /* border: 1px solid purple; */
  align-items: center;
  justify-content: center;
  /* height: 100%; */
  background: #1d1d1d;
  opacity: 0.8;
  /* padding-bottom: 320; */
`;

const ChooseText = styled.Text`
  font-size: 30;
  color: white;
  text-align: center;
`;

const SubChoose = styled(ChooseText)`
  font-size: 18;
  margin-top: 9;
`;

const Info = styled(SubChoose)`
  font-size: 18;
  margin-bottom: 5;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  /* border: 1px solid red; */
  width: 250;
  margin-top: 3;
  margin-bottom: 5;
`;

const Price = styled(ChooseText)`
  margin-top: 5;
  margin-bottom: 5;
  color: black;
`;

const Card = styled.View`
  border: 2px solid black;
  padding-top: 1;
  padding-bottom: 10;
  padding-left: 5;
  padding-right: 5;
  background: white;
  border-radius: 20;
  /* height: 100%; */
`;

const PlanOptions = styled(Info)`
  text-decoration: underline;
  font-size: 30;
`;

const FalseContainer = styled(Container)`
  padding-bottom: 320;
  padding-top: 150;
`;
