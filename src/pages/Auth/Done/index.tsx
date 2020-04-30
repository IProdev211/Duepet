import React from "react";
import { IProps } from "store/interface";
import { Scene, CenterScreen, BgStyle } from "styles/designSystem";
import styled from "styled-components";
import { View, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ThemeStyle from "../../../styles/theme";
import { RespScreenHeight } from "styles/sizes";

const Circle = styled(View)`
  width: ${RespScreenHeight(19)};
  height: ${RespScreenHeight(19)};
  background-color: ${ThemeStyle.backgroundLight};
  border-radius: ${RespScreenHeight(19)};
`;

class Done extends React.Component<IProps> {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("Login");
    }, 2000);
  }

  render() {
    return (
      <ImageBackground style={BgStyle.fullImage} source={require("../../../../assets/images/bg/bg.png")}>
        <Scene>
          <CenterScreen>
            <Circle>
              <CheckIcon name="check" />
            </Circle>
          </CenterScreen>
        </Scene>
      </ImageBackground>
    );
  }
}

const CheckIcon = styled(MaterialIcons)`
  font-size: ${RespScreenHeight(19)};
  color: ${ThemeStyle.backgroundDark};
`;

export default Done;
