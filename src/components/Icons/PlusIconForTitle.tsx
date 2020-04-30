import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IProps {
  onPress: any;
}

export const PlusIconForTitle = (props: IProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Image
        source={require("../../../assets/images/plus_for_title/plus_for_title.png")}
      />
    </TouchableOpacity>
  );
};
