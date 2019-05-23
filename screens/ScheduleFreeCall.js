import React, { useState } from "react";
// import moment from "moment";
import moment from "moment-timezone";
import moment1 from "moment";
import styled from "styled-components";
import { View, Text, Picker, Input } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import randomTime from "../components/scheduler/randomTime";
import { Button } from "react-native-elements";

import { db } from "../constants/ApiKeys";
import Time from "../components/AppComponents/Time";
import { Actions } from "react-native-router-flux";

const ScheduleFreeCall = ({ contactId, userId, frequency }) => {
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

  // const [time, setTime] = useState(initialState);

  // const setTimezone = e => {
  //   setTime({
  //     ...time,
  //     timezone: e.target.value
  //   });
  // };

  // const selectTime = (selected, clicked) => {
  //   const prevTimes = time.selectedTimes;
  //   if (clicked) {
  //     setTime({
  //       ...time,
  //       selectedTimes: prevTimes.filter(item => item !== selected)
  //     });
  //   } else {
  //     setTime({
  //       ...time,
  //       selectedTimes: [...prevTimes, selected]
  //     });
  //   }
  // };

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
      // navigate(`/confirmation/${docRef.id}`);
      Actions.callconfirmation({ contactId: docRef.id });
      console.log("SUCCESS", docRef);
    } catch (err) {
      console.log(err);
    }
  };

  // const settings = {
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 7,
  //   slidesToScroll: 1,
  //   touchMove: false,
  //   swipe: false,
  //   touchThreshold: 1,
  //   responsive: [
  //     {
  //       breakpoint: 890,
  //       settings: {
  //         slidesToShow: 5,
  //         slidesToScroll: 1
  //       }
  //     },
  //     {
  //       breakpoint: 590,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1
  //       }
  //     },
  //     {
  //       breakpoint: 430,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1
  //       }
  //     }
  //   ]
  // };

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
    <View>
      <View className="header">
        <View>
          <Text>Schedule a free call</Text>
        </View>
        <Text>
          Please select the block of hours that you have availability. A call
          will be randomly scheduled in one of the time blocks selected.
        </Text>
        {/* <Time allInfo={allInfo} handleSubmit={handleSubmit} /> */}
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
      {/* <form onSubmit={handleSubmit}>
        <View className="timezone-select">
          <label htmlFor="timezone">Please select your time zone</label>
          <Select
            id="timezone"
            onChange={setTimezone}
            value={time.timezone}
            placeholder="Select a Time Zone"
          >
            <MenuItem value={time.timezone} defaultValue>
              {time.timezone}
            </MenuItem>
            <MenuItem value="US/Alaska">Alaska</MenuItem>
            <MenuItem value="US/Aleutian">Aleutian</MenuItem>
            <MenuItem value="US/Arizona">Arizona</MenuItem>
            <MenuItem value="US/Central">Central</MenuItem>
            <MenuItem value="US/East-Indiana">East-Indiana</MenuItem>
            <MenuItem value="US/Eastern">Eastern</MenuItem>
            <MenuItem value="US/Hawaii">Hawaii</MenuItem>
            <MenuItem value="US/Indiana-Starke">Indiana-Starke</MenuItem>
            <MenuItem value="US/Michigan">Michigan</MenuItem>
            <MenuItem value="US/Mountain">Mountain</MenuItem>
            <MenuItem value="US/Pacific">Pacific</MenuItem>
            <MenuItem value="US/Pacific-New">Pacific-New</MenuItem>
          </Select> 
         </View> */}

      {/*<View className="days">
           <Slider {...settings}>
             {time.days.map((day, index) => (
    //           <Day
    //             day={day}
    //             key={day}
    //             timezone={time.timezone}
    //             selectTime={selectTime}
    //             index={index}
    //             current={[]}
    //           />
    //         ))}
    //       </Slider>
    //     </View>
    //     <Button type="submit">Submit</Button>
    //   </form>
    // </View>
             // );*/}
    </View>
  );
};

export default ScheduleFreeCall;

/* // export default withStyles(styles)(ScheduleFreeCall); */

// const Button = styled.button`
//   background-color: #636578;
//   width: 157px;
//   height: 43px;
//   border-radius: 5px;
//   color: #ffffff;
//   font-size: 16px;
//   transition: all 0.4s ease;
//   outline: 0;
//   &:hover {
//     background-color: #ffffff;
//     color: #636578;
//     border: 1px solid #636578;
//     cursor: pointer;
//     transition: all 0.4s ease;
//   }
// `;
