import React from 'react';
import { View, Text } from "react-native";

import UpdateFreeCall from './UpdateFreeCall';
import UpdatePaidCall from './UpdatePaidCall';

const UpdateContact = ({ location, user }) => {
  const contact = !location.state ? null : location.state.contact;

  if (!contact || contact.user1.uid !== user.uid)
    return (
      <Text>
        Please contact the person who scheduled this contact to update
        information
      </Text>
    );

  return contact.call_type === 'paid' ? (
    <UpdatePaidCall contact={contact} />
  ) : (
    <UpdateFreeCall contact={contact} />
  );
};

export default UpdateContact;
