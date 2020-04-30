import React from "react";
import styled from "styled-components";
import { More } from "components/Icons/More";
import { Text } from "react-native";
import ThemeStyle from "styles/theme";
import { FontSize, RespScreenWidth } from "styles/sizes";
import I18nContext from "translations/I18nContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const TabMore = props => {
  const Background = styled(TouchableOpacity)`
    align-items: center;
    width: ${RespScreenWidth(20)};
  `;

  const Label = styled(Text)`
    font-size: ${FontSize.md};
    color: ${ThemeStyle.commonText};
  `;

  return (
    <Background onPress={props.onPress}>
      <More />
      <Label>{I18nContext.getString("bottom_tab_more")}</Label>
    </Background>
  );
};

export default TabMore;
