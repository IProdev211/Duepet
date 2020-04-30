import React from "react";
import styled from "styled-components";
import { PetProfile } from "../../Icons/PetProfile";
import { Text } from "react-native";
import ThemeStyle from "styles/theme";
import { FontSize } from "styles/sizes";
import I18nContext from "../../../translations/I18nContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";

const TabPetProfile = props => {
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
      <PetProfile />
      <Label>{I18nContext.getString("bottom_tab_pets")}</Label>
    </Background>
  );
};

export default TabPetProfile;
