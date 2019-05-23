import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import moment from "moment";
import styled from "styled-components";
import axios from "axios";

const Billing = ({ user }) => {
  const [subs, setSubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-recaller-14a1f.cloudfunctions.net/stripe/billing/${
            user.stripe_id
          }`
        );
        setSubs(subs => response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [user]);

  return isLoading ? (
    <View>
      <Text>Loading...</Text>
    </View>
  ) : (
    <Container>
      <Info>Billing information</Info>
      <Center>
        {subs ? (
          subs.map(sub => {
            return (
              <View key={sub.contact_id}>
                <Info>
                  <Info>{sub.user2.displayName}</Info> |
                  {sub.contact.call_frequency}
                </Info>
                <View>
                  <Info>
                    {sub.contact.scheduled_day}s at {sub.contact.scheduled_time}
                  </Info>
                </View>
                {/* <Link to={`/contact/${sub.contact_id}`}>Contact Details</Link> */}

                <Info>Previous Charges</Info>
                {sub.invoices.map(invoice => {
                  return (
                    <View key={invoice.id}>
                      <Info>
                        {moment(invoice.paid_at, "X").format("MM/DD/YY")}
                      </Info>
                      <Info>${(invoice.amount_paid / 100).toFixed(2)}</Info>
                      <Info>
                        <Info>Receipt</Info>
                      </Info>
                    </View>
                  );
                })}
                <Info>
                  Next Charge:{" "}
                  {sub.contact.call_frequency === "Monthly"
                    ? "$2.50 "
                    : "$5.00 "}
                  on {moment(sub.next_charge_date, "X").format("M/D/YY")}
                </Info>
              </View>
            );
          })
        ) : (
          <Info>You have no previous premium calls scheduled</Info>
        )}
      </Center>
    </Container>
  );
};

export default Billing;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  background: #1d1d1d;
  /* opacity: 0.8; */
  height: 100%;
  width: 100%;
`;

const Info = styled.Text`
  color: white;
  font-size: 22;
  font-weight: 400;
  text-align: center;
  margin: 5% auto;
`;

const Center = styled.View`
  justify-content: space-around;
`;
