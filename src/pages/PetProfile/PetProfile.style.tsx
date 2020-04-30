import { ScrollView } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import { RespScreenHeight, RespScreenWidth, FontSize } from "styles/sizes";
import styled from "styled-components";
import ThemeStyle from "styles/theme";

export const Container = styled(View)`
  flex: 1;
  flex-direction: column;
  margin-top: ${RespScreenHeight(3)};
  margin-bottom: ${RespScreenHeight(15)};
`;

export const EditIconContainer = styled(View)`
  position: absolute;
  right: ${RespScreenWidth(6)};
  top: -10px;
`;

export const ScrollContainer = styled(ScrollView)``;

export const ScrollViewContainer = styled(ScrollView)`
  margin-top: ${RespScreenHeight(1.5)};
  padding: ${RespScreenHeight(1.5)} ${RespScreenWidth(2)};
`;

export const AfterText = styled(Text)`
  color: ${ThemeStyle.commonText};
`;

export const PetsCarouselWrapper = styled.View`
  margin-bottom: ${RespScreenHeight(5)};
`;

export const PetImageSlider = styled(View)`
  margin-bottom: ${RespScreenHeight(3)};
`;

export const PetWarning = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-horizontal: ${RespScreenWidth(3)};
`;

export const PetWarningText = styled.Text`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.xxl};
  text-align: center;
`;
