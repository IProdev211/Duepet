import React, { Component } from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import ThemeStyle from "styles/theme";
import I18nContext from "../../translations/I18nContext";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";
import { TouchableOpacity } from "react-native-gesture-handler";

class UpgradeButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Background = styled(TouchableOpacity)`
      width: ${RespScreenWidth(100)};
      padding: ${RespScreenWidth(3)};
      border-radius: 15px;
      margin-top: ${RespScreenHeight(2)};
      background-color: ${ThemeStyle.backgroundDark};
      align-items: center;
    `;

    const ContentText = styled(Text)`
      font-size: ${FontSize.xl};
      color: ${ThemeStyle.commonText};
      text-align: center;
    `;
    const ContentList = styled.Text`
      font-size: ${FontSize.xl};
      color: ${ThemeStyle.commonText};
    `;

    return (
      <Background>
        <ContentText>
          {I18nContext.getString("upgrade_description")}
        </ContentText>
        <ContentList>
          {I18nContext.getString("upgrade_description_list")}
        </ContentList>
      </Background>
    );
  }
}

export default UpgradeButton;
