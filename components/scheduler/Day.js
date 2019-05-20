import React from "react";
import { View, Text } from "react-native";

import Slot from "./Slot";
import { generateTimeSlots } from "./generateTimeSlots";

const Day = ({ day, timezone, selectTime, current }) => {
  const timeSlots = generateTimeSlots(60, "06:00", "23:00");

  return (
    <View>
      <Text>{day}</Text>
      <View>
        <View>
          {timeSlots.map(slot => (
            <Slot
              slot={slot}
              key={slot}
              day={day}
              timezone={timezone}
              selectTime={selectTime}
              current={current}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Day;
