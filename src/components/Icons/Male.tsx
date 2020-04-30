import React, { Component } from "react";
import { Image, View, Text } from "react-native";
import styled from "styled-components";
import ThemeStyle from "styles/theme";
import { FontSize } from "styles/sizes";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import I18nContext from "../../translations/I18nContext";

interface IProps {
  onPress?: any;
  maleSelect: boolean;
}

const GenderContainer = styled(View)`
  flex-direction: column-reverse;
  align-items: center;
  flex: 1;
`;

const MaleText = styled(Text)`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.xs};
`;

class Male extends Component<IProps, { select: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      select: props.maleSelect
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.maleSelect != state.select) {
      return {
        select: props.maleSelect
      };
    }
    return null;
  }

  render() {
    return (
      <GenderContainer>
        <MaleText>{I18nContext.getString("male")}</MaleText>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          {!this.props.maleSelect && (
            <Image source={require("../../../assets/images/male/male.png")} />
          )}
          {this.props.maleSelect && (
            <Image
              source={require("../../../assets/images/male_active/male_active.png")}
            />
          )}
        </TouchableWithoutFeedback>
      </GenderContainer>
    );
  }
}

export default Male;
