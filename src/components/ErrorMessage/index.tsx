import * as React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import { RespScreenHeight } from "styles/sizes";
import ThemeStyle from "styles/theme";

const ErrorText = styled(Text)`
  color: ${ThemeStyle.errorMessageText};
  margin-top: ${RespScreenHeight(0.3)};
  position: absolute;
`;

export default function ErrorMessage(props) {
  return <ErrorText>{props.text}</ErrorText>;
}
