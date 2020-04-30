import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Visibility = props => (
  <TouchableOpacity onPress={props.onPress}>
    <Image
      source={require("../../../assets/images/visibility/visibility.png")}
    />
  </TouchableOpacity>
);
