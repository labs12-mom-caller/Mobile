import React, { useState, useEffect } from 'react';
import { View, Text } from "react-native";
import moment from 'moment-timezone';

const Slot = ({ slot, timezone, day, selectTime, current }) => {
  const [click, setClick] = useState(false);

  useEffect(() => {
    const match = moment
      .tz(`${day} ${slot}`, 'dddd hh:mm A', timezone)
      .tz('UTC')
      .format();
    const found = current.find(el => {
      return el === match;
    });
    if (found) {
      setClick(c => !c);
    }
  }, [current, day, slot, timezone]);

  const handleClick = e => {
    e.preventDefault();
    setClick(prev => !prev);
    const formatted = moment
      .tz(`${day} ${slot}`, 'dddd hh:mm A', timezone)
      .tz('UTC')
      .format();
    selectTime(formatted, click);
  };

  const handleFocus = e => {
    e.preventDefault();
    e.target.addEventListener('keydown', e => {
      if (e.code === 'Space') {
        e.preventDefault();
        setClick(prev => !prev);
        const formatted = moment
          .tz(`${day} ${slot}`, 'dddd hh:mm A', timezone)
          .tz('UTC')
          .format();
        selectTime(formatted, click);
      }
    });
    return e.target.removeEventListener('keydown', e => {
      if (e.code === 'Space') {
        e.preventDefault();
        setClick(prev => !prev);
        const formatted = moment
          .tz(`${day} ${slot}`, 'dddd hh:mm A', timezone)
          .tz('UTC')
          .format();
        selectTime(formatted, click);
      }
    });
  };

  return (
    <View>
      <View
        onMouseDown={e => handleClick(e)}
        onMouseOver={e => {
          if (e.buttons === 1) {
            handleClick(e);
          }
        }}
        onFocus={e => handleFocus(e)}
        role='option'
        aria-selected={click}
        tabIndex='0'
        className={!click ? 'slot' : 'slot selected-slot'}
      >
        {slot}
      </View>
    </View>
  );
};

export default Slot;
