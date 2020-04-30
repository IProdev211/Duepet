import * as React from "react";
import styled from "styled-components";
import { Text, TouchableOpacity } from "react-native";
import { FontSize } from "styles/sizes";
import ThemeStyle from "styles/theme";

const CustomText = styled(Text)`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.sm};
  font-weight: bold;
`;

export default function BottomText(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <CustomText>{props.text}</CustomText>
    </TouchableOpacity>
  )
}
