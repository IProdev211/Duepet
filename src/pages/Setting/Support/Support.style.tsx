import { View, TextInput, KeyboardAvoidingView } from "react-native";
import styled from "styled-components";
import { FontSize, RespScreenHeight, RespScreenWidth } from "styles/sizes";
import ThemeStyle from "styles/theme";

export const DescriptionContainer = styled(View)`
  margin-top: ${RespScreenHeight(5)};
  width: ${RespScreenWidth(85)};
  height: ${RespScreenHeight(25)};
  border-radius: 15px;
  align-self: center;
  background-color: ${ThemeStyle.backgroundWhite};
`;

export const DescriptionForm = styled(TextInput)`
  flex: 1;
  font-size: ${FontSize.xl};
  margin: 10px;
  text-align-vertical: top;
`;

export const ScrollContainer = styled.View`
  margin-top: ${RespScreenHeight(5)};
  height: ${RespScreenHeight(55)};
`;

export const KeyboardAvoidingViewContainer = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const CloseButton = styled.TouchableOpacity`
  flex-direction: row-reverse;
`;

export const SubmitButtonView = styled.View`
  margin-bottom: ${RespScreenHeight(15)};
`;
