import React, { useState } from "react";
// import moment from "moment";
import moment from "moment-timezone";
import moment1 from "moment";
import styled from "styled-components";
import {
  View,
  Text,
  Picker,
  Input,
  StyleSheet,
  ImageBackground
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import randomTime from "../components/scheduler/randomTime";
import { Button, Icon } from "react-native-elements";

import { db } from "../constants/ApiKeys";
import Time from "../components/AppComponents/Time";
import { Actions } from "react-native-router-flux";
import { Enum } from "protobufjs";

const ScheduleFreeCall = ({ contactId, userId, frequency }) => {
  const [info, setInfo] = useState({});
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [isVisibleTime, setIsVisibleTime] = useState(false);
  const [timeList, setTimeList] = useState([]);

  const showTPicker = () => {
    setIsVisibleTime(!isVisibleTime);
  };

  const handleTimePicked = timeSelect => {
    console.log("time: ", timeSelect);
    const format = moment1(timeSelect).format();
    // console.log(format);
    // saveIt(format);
    if (timeList.length === 0) {
      // timeList.push(format);
      setTimeList([format]);
      showTPicker();
      console.log(timeList);
      // console.log(time, day)
    } else {
      setTimeList([...timeList, format]);
      showTPicker();
    }
  };

  const timeFunction = tz => {
    setTime(tz);
    console.log(time);
  };

  const dayFunction = d => {
    setDay(d);
    console.log(day);
  };

  const tFunction = t => {
    setTimeList(t);
    console.log(t);
  };
  console.log(timeList, "Time List Array");

  const handleSubmit = async () => {
    console.log("Fired");
    console.log(frequency, "from handle submit");
    const thisTime = randomTime(timeList);
    let nextCall = moment1(thisTime).toDate();
    console.log("this time: ", thisTime, nextCall);
    if (
      nextCall <
      moment()
        .tz(time)
        .toDate()
    ) {
      nextCall = moment1(nextCall)
        .add(1, "w")
        .toDate();
    }
    try {
      const docRef = await db.collection("contacts").add({
        call_frequency: frequency,
        call_type: "free",
        next_call: nextCall,
        timezone: time,
        selected_times: timeList,
        user1: db.collection("users").doc(userId),
        user2: db.collection("users").doc(contactId),
        created_at: moment().toDate(),
        updated_at: moment().toDate(),
        canceled: false
      });
      Actions.callconfirmation({ contactId: docRef.id });
      console.log("SUCCESS", docRef);
    } catch (err) {
      console.log(err);
    }
  };

  const allInfo = async (day, time, timeList) => {
    const infos = await { day, time, timeList };
    if (info === null) {
      setInfo(infos);
      console.log(info, "STATE from allInfo SetState");
      console.log("HERE", here);
    }
    setInfo(infos);
    console.log("THERE", there);
    return there;
    console.log(info, "STATE from allInfo SetState");
  };
  console.log(info, "INFO from STATE");

  return (
    <ImageBackground
      source={require("../assets/planning.jpg")}
      style={styles.Wrapper}
      imageStyle={{
        resizeMode: "cover"
      }}
    >
      <Container>
        <Info>Schedule a free call</Info>
        <Info>
          Please select the block of hours that you have availability. A call
          will be randomly scheduled in one of the time blocks selected.
        </Info>
        {/* <Time allInfo={allInfo} handleSubmit={handleSubmit} /> */}
        <Info>Please select your time zone</Info>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "white",
            paddingVertical: 5,
            alignItems: "center"
          }}
        >
          <Picker
            selectedValue={time}
            onValueChange={timeFunction}
            style={{
              height: 40,
              width: "80%",
              alignSelf: "center",
              backgroundColor: "transparent"
            }}
          >
            <Picker.Item label="Pacific-New" value={time.timezone} />
            <Picker.Item label="Alaska" value="US/Alaska" />
            <Picker.Item label="Aleutian" value="US/Aleutian" />
            <Picker.Item label="Arizona" value="US/Arizona" />
            <Picker.Item label="Central" value="US/Central" />
            <Picker.Item label="East-Indiana" value="US/East-Indiana" />
            <Picker.Item label="Eastern" value="US/Eastern" />
            <Picker.Item label="Hawaii" value="US/Hawaii" />
            <Picker.Item label="Indiana-Starke" value="US/Indiana-Starke" />
            <Picker.Item label="Michigan" value="US/Michigan" />
            <Picker.Item label="Mountain" value="US/Mountain" />
            <Picker.Item label="Pacific" value="US/Pacific" />
            <Picker.Item label="Pacific-New" value="US/Pacific-New" />
          </Picker>
          <Icon
            name="chevron-down"
            type="font-awesome"
            size={20}
            color="black"
            style={{ alignSelf: "center", opacity: 0.5 }}
          />
        </View>
        <Info>Select Day</Info>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "white",
            paddingVertical: 5,
            alignItems: "center"
          }}
        >
          <Picker
            selectedValue={day}
            onValueChange={dayFunction}
            style={{
              height: 40,
              width: "80%",
              alignSelf: "center",
              backgroundColor: "transparent"
            }}
          >
            <Picker.Item label="Sunday" value="Sunday" />
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
          </Picker>
          <Icon
            name="chevron-down"
            type="font-awesome"
            size={20}
            color="black"
            style={{ alignSelf: "center", opacity: 0.5 }}
          />
        </View>
        <Info>Choose Time</Info>
        <Button
          title="Choose Time"
          type="solid"
          onPress={() => showTPicker()}
          containerStyle={{ width: 150, alignSelf: "center" }}
          buttonStyle={{
            borderColor: "black",
            borderWidth: 1.5,
            backgroundColor: "white",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            // borderRadius: 10,
            padding: 5,
            height: 40
          }}
          titleStyle={{ color: "white" }}
        />
        {/* <Button onPress={() => handleSubmit()} title="Submit" /> */}
        <Button
          title="Submit"
          type="solid"
          onPress={() => handleSubmit()}
          containerStyle={{
            width: 150,
            alignSelf: "center",
            marginTop: 10
          }}
          buttonStyle={{
            borderColor: "black",
            borderWidth: 1.5,
            backgroundColor: "white",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            // borderRadius: 10,
            padding: 5,
            height: 40
          }}
          titleStyle={{ color: "white" }}
        />
        {/* <Button onPress={() => showTPicker()} title="choose time" /> */}
        {isVisibleTime && (
          <DateTimePicker
            isVisible={isVisibleTime}
            mode="Both"
            onConfirm={handleTimePicked}
            onCancel={showTPicker}
            is24Hour={false}
          />
        )}
      </Container>
    </ImageBackground>
  );
};

export default ScheduleFreeCall;

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: "rgba(0, 0, 44, 0.2)",
    width: "100%",
    height: "100%",
    // alignItems: "center",
    justifyContent: "center"
  }
});

const Container = styled.View`
  background: #1d1d1d;
  opacity: 0.8;
  height: 100%;
  width: 100%;
  padding: 5%;
  /* align-items: center; */
`;

const Info = styled.Text`
  color: white;
  font-size: 22;
  font-weight: 400;
  text-align: center;
  margin: 5% auto;
`;
