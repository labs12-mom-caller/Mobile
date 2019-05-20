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
    <>
      <Text>Billing information</Text>
      <View>
        {subs ? (
          subs.map(sub => {
            return (
              <View key={sub.contact_id}>
                <Text>
                  {" "}
                  <Text>
                    {sub.user2.displayName}
                  </Text>{" "}
                  | {sub.contact.call_frequency}
                </Text>
                <View>
                  <Text>
                    {sub.contact.scheduled_day}s at {sub.contact.scheduled_time}
                  </Text>
                </View>
                {/* <Link to={`/contact/${sub.contact_id}`}>Contact Details</Link> */}

                <Text>Previous Charges</Text>
                {sub.invoices.map(invoice => {
                  return (
                    <View key={invoice.id}>
                      <Text>
                        {moment(invoice.paid_at, "X").format("MM/DD/YY")}
                      </Text>
                      <Text>${(invoice.amount_paid / 100).toFixed(2)}</Text>
                      <Text>
                        <Text>Receipt</Text>
                      </Text>
                    </View>
                  );
                })}
                <Text>
                  Next Charge:{" "}
                  {sub.contact.call_frequency === "Monthly"
                    ? "$2.50 "
                    : "$5.00 "}
                  on {moment(sub.next_charge_date, "X").format("M/D/YY")}
                </Text>
              </View>
            );
          })
        ) : (
          <Text>You have no previous premium calls scheduled</Text>
        )}
      </View>
    </>
  );
};

export default Billing;
