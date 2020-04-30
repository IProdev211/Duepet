import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Next = props => (
  <TouchableOpacity onPress={props.onPress}>
    <Image
      source={require("../../../assets/images/right/right.png")}
      style={props.style}
    />
  </TouchableOpacity>
);
