import React, { Component } from "react";
import { Text } from "react-native";
import styled from "styled-components";
import ThemeStyle from "styles/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";

const ButtonContainer = styled(TouchableOpacity)`
  background-color: ${props => props.bgColor ? ThemeStyle.backgroundLight : ThemeStyle.backgroundDark};
  margin-top: ${props => props.hidePet ? RespScreenHeight(10) : RespScreenHeight(2)};
  margin-bottom: ${RespScreenHeight(1)};
  margin-horizontal: ${RespScreenWidth(25)};
  padding-vertical:  ${props => props.hidePet ? RespScreenWidth(3) : RespScreenWidth(2)};
  border-radius: ${RespScreenHeight(1.5)};
  align-items: center;
 ${props => props.padding ? "padding :" + RespScreenWidth(4) : ""}
`;

const ButtonText = styled(Text)`
  font-size: ${FontSize.xl};
  color: ${ThemeStyle.commonText};
`;

interface Props {
  onPress: any;
  text: string;
  bgColor?: boolean;
  hidePet?: boolean;
  padding?: boolean;
}

class SmallButton extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ButtonContainer hidePet={this.props.hidePet} bgColor={this.props.bgColor} padding={this.props.padding} onPress={this.props.onPress}>
        <ButtonText>{this.props.text}</ButtonText>
      </ButtonContainer>
    );
  }
}

export default SmallButton;
