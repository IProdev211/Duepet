import * as React from "react";
import styled from "styled-components";
import { Text } from "react-native";
import { FontSize } from "styles/sizes";
import ThemeStyle from "styles/theme";

const Title = styled(Text)`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.xxxxl};
  font-weight: bold;
  text-align: center;
`;

export default function AddPetProfileTitle(props) {
  return <Title>{props.title}</Title>;
}
