import * as React from "react";
import styled from "styled-components";
import { Text } from "react-native";
import { FontSize } from "styles/sizes";
import ThemeStyle from "styles/theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Title = styled(Text)`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.xxxl};
  font-weight: bold;
  margin-top: ${props => (props.marginTop ? hp(props.marginTop + "%") + "px" : "0px")};
`;

export default function DpTitle(props) {
  return <Title marginTop={props.marginTop}>{props.title}</Title>;
}
