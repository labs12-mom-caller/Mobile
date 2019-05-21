import React, { useState } from "react";
import moment from "moment-timezone";
import moment1 from "moment";
import { View, Text, Picker, Input } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Button } from "react-native-elements";

const Time = props => {
  // const initialState = {
  //   timezone: moment.tz.guess(),
  //   days: [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday"
  //   ],
  //   selectedTimes: []
  // };

  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [isVisibleTime, setIsVisibleTime] = useState(false);
  const [timeList, setTimeList] = useState([]);

  const showTPicker = () => {
    setIsVisibleTime(!isVisibleTime);
  };
  // const saveIt = format => {
  //   setTimeList(...timeList, format);
  // };
  const handleTimePicked = timeSelect => {
    console.log("time: ", timeSelect);
    const format = moment1(timeSelect).format();
    // console.log(format);
    // saveIt(format);
    if (timeList.length === 0) {
      // timeList.push(format);
      setTimeList([format]);
      showTPicker();
    } else {
      setTimeList([...timeList, format]);
      showTPicker();
    }
  };
  console.log(timeList, "Time List Array");
  // const chooseThree = timeSelect => {
  //   const format = moment1(timeSelect).format()
  //   setTimeList(...timeList, format)
  // }
  const timeFunction = tz => {
    setTime(tz);
  };

  const dayFunction = d => {
    setDay(d);
  };

  // const setTimezone = e => {
  //   setTime({
  //     ...time,
  //     timezone: e.target.value
  //   });
  // };

  const selectTime = (selected, clicked) => {
    const prevTimes = time.selectedTimes;
    if (clicked) {
      setTime({
        ...time,
        selectedTimes: prevTimes.filter(item => item !== selected)
      });
    } else {
      setTime({
        ...time,
        selectedTimes: [...prevTimes, selected]
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const thisTime = randomTime(timeList);
    let nextCall = moment(thisTime).toDate();
    if (
      nextCall <
      moment()
        .tz(time.timezone)
        .toDate()
    ) {
      nextCall = moment(nextCall)
        .add(1, "w")
        .toDate();
    }
    try {
      const docRef = await db.collection("contacts").add({
        call_frequency: frequency,
        call_type: "free",
        next_call: nextCall,
        timezone: time.timezone,
        selected_times: time.selectedTimes,
        user1: db.collection("users").doc(userId),
        user2: db.collection("users").doc(contactId),
        created_at: moment().toDate(),
        updated_at: moment().toDate(),
        canceled: false
      });
      navigate(`/confirmation/${docRef.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <View>
        <Text>Please select your time zone</Text>
        <Picker selectedValue={time} onValueChange={timeFunction}>
          <Picker.Item label="" value={time.timezone} />
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
        <Text>Select Day</Text>
        <Picker selectedValue={day} onValueChange={dayFunction}>
          <Picker.Item label="Sunday" value="Sunday" />
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
        </Picker>
        <Text>Choose Time</Text>
        <Button onPress={() => handleSubmit()} title="Submit" />
        <Button onPress={() => showTPicker()} title="choose time" />
        {isVisibleTime && (
          <DateTimePicker
            isVisible={isVisibleTime}
            mode="Both"
            onConfirm={handleTimePicked}
            onCancel={showTPicker}
            is24Hour={false}
          />
        )}
      </View>
    </View>
  );
};

export default Time;
