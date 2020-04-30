import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const AddActionPlus = props => (
  <TouchableOpacity onPress={props.onPress}>
    <Image
      source={require("../../../assets/images/add_action/add_action.png")}
    />
  </TouchableOpacity>
);
