import { Text } from "react-native";
import { FontSize } from "styles/sizes";
import * as React from "react";
import styled from "styled-components";
import ThemeStyle from "styles/theme";

const SubTitle = styled(Text)`
  color: ${props => props.textColor ? props.textColor : ThemeStyle.commonText};
  font-size: ${FontSize.lg};
  ${
  props => props.fontBold ? 'font-weight : bold' : null
  }
  ${
  props => props.center ? 'text-align : center ' : null
  }
`;

export default function DpSubTitle(props) {
  return <SubTitle center={props.center} fontBold={props.fontBold} textColor={props.textColor}>{props.subTitle}</SubTitle>;
}
