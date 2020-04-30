import React from "react";
import { Text, View } from "react-native";
import styled, { css } from "styled-components";
import ThemeStyle from "styles/theme";
import { FontSize } from "styles/sizes";
import { AddActionPlus } from "../Icons/AddActionPlus";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const ActionTitle = styled(Text)`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.xl};
`;

const ActionTitleView = styled(TouchableOpacity)`
  margin-right: ${wp("3%") + "px"};
  flex: 1;
  justify-content: center;
  padding-bottom: 5px;
`;

const Background = styled(View)`
  flex-direction: row-reverse;
  margin-left: ${wp("7%") + "px"};
  align-items: center;
`;

const Action = props => {
  return (
    <Background>
      <AddActionPlus onPress={props.onPress} />
      <ActionTitleView onPress={props.onPress}>
        <ActionTitle>{props.actionTitle}</ActionTitle>
      </ActionTitleView>
    </Background>
  );
};

export default Action;
