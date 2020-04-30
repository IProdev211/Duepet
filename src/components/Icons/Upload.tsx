import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Upload = props => (
  <TouchableOpacity onPress={props.onPress}>
    <Image
      source={require("../../../assets/images/upload/upload.png")}
      style={props.style}
    />
  </TouchableOpacity>
);
