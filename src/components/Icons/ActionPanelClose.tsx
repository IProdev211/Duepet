import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const ActionPanelClose = props => (
  <TouchableOpacity onPress={props.onPress}>
    <Image source={require("../../../assets/images/action_panel_close/action_panel_close.png")} />
  </TouchableOpacity>
);
