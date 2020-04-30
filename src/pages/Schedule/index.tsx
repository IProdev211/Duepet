import React, { Component } from "react";
import { View, Text } from "react-native";
import { AppContainer } from "../../styles/designSystem";

class Schedule extends Component {
  render() {
    return (
      <AppContainer>
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            There will be schedules
          </Text>
        </View>
      </AppContainer>
    );
  }
}

export default Schedule;
