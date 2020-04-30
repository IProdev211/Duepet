import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Left = props => (
  <TouchableOpacity onPress={props.onPress}>
    <Image
      source={require("../../../assets/images/arrow_left/arrow_left.png")}
      style={props.style}
    />
  </TouchableOpacity>
);
