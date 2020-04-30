import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const TrackEdit = props => (
  <TouchableOpacity onPress={props.onPress}>
    <Image
      source={require("../../../assets/images/tracker_edit/tracker_edit.png")}
    />
  </TouchableOpacity>
);
