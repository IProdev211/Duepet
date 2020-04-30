import React from "react";
import styled from "styled-components";
import { Schedule } from "../../Icons/Schedule";
import { Text } from "react-native";
import ThemeStyle from "styles/theme";
import { FontSize } from "styles/sizes";
import I18nContext from "../../../translations/I18nContext";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";

const TabSchedule = props => {
  const Background = styled(TouchableOpacity)`
    align-items: center;
    width: ${wp("20%") + "px"};
  `;

  const Label = styled(Text)`
    font-size: ${FontSize.md};
    color: ${ThemeStyle.commonText};
  `;

  return (
    <Background onPress={props.onPress}>
      <Schedule />
      <Label>{I18nContext.getString("bottom_tab_schedule")}</Label>
    </Background>
  );
};

export default TabSchedule;
