import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const ActionPanel = props => (
  <TouchableOpacity onPress={props.onPress} style={props.style}>
    <Image
      source={require("../../../assets/images/action_panel/action_panel.png")}
    />
  </TouchableOpacity>
);
