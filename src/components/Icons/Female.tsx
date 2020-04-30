import React, { Component } from "react";
import { Image, View, Text } from "react-native";
import styled from "styled-components";
import ThemeStyle from "styles/theme";
import { FontSize } from "styles/sizes";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import I18nContext from "translations/I18nContext";

interface IProps {
  onPress?: any;
  femaleSelect: boolean;
}

const GenderContainer = styled(View)`
  flex-direction: column-reverse;
  align-items: center;
`;

const FemaleText = styled(Text)`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.xs};
`;

class Female extends Component<IProps, { select: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      select: props.femaleSelect
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.femaleSelect != state.select) {
      return {
        select: props.femaleSelect
      };
    }
    return null;
  }

  render() {
    return (
      <GenderContainer>
        <FemaleText>{I18nContext.getString("female")}</FemaleText>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          {!this.props.femaleSelect && (
            <Image
              source={require("../../../assets/images/female/female.png")}
            />
          )}
          {this.props.femaleSelect && (
            <Image
              source={require("../../../assets/images/female_active/female_active.png")}
            />
          )}
        </TouchableWithoutFeedback>
      </GenderContainer>
    );
  }
}

export default Female;
