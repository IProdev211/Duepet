import * as React from "react";
import styled from "styled-components";
import { View, Text, TouchableOpacity } from "react-native";
import ThemeStyle from "styles/theme";

const Button = styled(View)`
  background-color: ${props =>
    props.bgColor ? props.bgColor : ThemeStyle.commonText};
  border-radius: 3px;
  margin-top: ${props => (props.marginTop ? props.marginTop + "px" : "0px")};
  width: ${props => (props.width ? props.width + "%" : "auto")};
  padding: ${props => (props.padding ? props.padding + "px" : "10px")};
`;

const ButtonText = styled(Text)`
  color: ${props =>
    props.textColor ? props.textColor : ThemeStyle.descriptionTextLight};
  text-align: center;
  font-weight: bold;
  text-transform: ${props =>
    props.textTransform ? props.textTransform : "capitalize"};
`;

export function PrimaryButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress} >
      <Button marginTop={props.marginTop} bgColor={props.bgColor}>
        <ButtonText textColor={props.textColor}>{props.text}</ButtonText>
      </Button>
    </TouchableOpacity>
  );
}

export function SecondaryButton(props) {
  return (
    <TouchableOpacity
      style={{ width: props.width + "%" }}
      onPress={props.onPress}
    >
      <Button
        padding={props.padding}
        marginTop={props.marginTop}
        bgColor={ThemeStyle.backgroundDark}
      >
        <ButtonText
          textTransform={props.textTransform}
          textColor={ThemeStyle.commonText}
        >
          {props.text}
        </ButtonText>
      </Button>
    </TouchableOpacity>
  );
}
