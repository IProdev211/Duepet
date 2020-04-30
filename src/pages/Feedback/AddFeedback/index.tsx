import React, { Component } from "react";
import { Text, View } from "react-native";
import { AppContainer } from "styles/designSystem";

class AddFeedback extends Component {
  render() {
    return (
      <AppContainer>
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Add Feedback</Text>
        </View>
      </AppContainer>
    );
  }
}

export default AddFeedback;
