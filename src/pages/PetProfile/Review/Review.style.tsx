import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components";
import { RespScreenHeight, RespScreenWidth } from "styles/sizes";
import ThemeStyle from "styles/theme";

export const Container = styled(View)`
  flex: 1;
  flex-direction: column;
  margin-bottom: ${RespScreenHeight(11)};
`;

export const EditIconContainer = styled(View)`
  position: absolute;
  right: ${RespScreenWidth(3)};
  top: ${RespScreenHeight(2)};
`;

export const ScrollContainer = styled(ScrollView)`
  margin-top: ${RespScreenHeight(3)};
`;

export const AfterText = styled(Text)`
  color: ${ThemeStyle.commonText};
`;
