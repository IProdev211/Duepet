import { KeyboardAvoidingView, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components";
import { RespScreenHeight, RespScreenWidth } from "styles/sizes";
import ThemeStyle from "styles/theme";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  flex-direction: column;
  margin-bottom: ${RespScreenHeight(11)};
`;

export const ScrollContainer = styled(ScrollView)`
  margin-top: ${RespScreenHeight(3)};
`;

export const AfterText = styled(Text)`
  color: ${ThemeStyle.commonText};
`;

export const BackButtonView = styled(TouchableOpacity)`
  margin-left: ${RespScreenWidth(6)};
`;

export const CloseButton = styled.TouchableOpacity``;
