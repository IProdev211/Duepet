import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const PetProfileAddImage = props => (
  <TouchableOpacity onPress={props.onPress}>
    <Image source={require("../../../assets/images/addImage/addImage.png")} />
  </TouchableOpacity>
);
