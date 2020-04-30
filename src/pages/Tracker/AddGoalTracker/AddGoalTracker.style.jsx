import { Image, View, Text, KeyboardAvoidingView } from "react-native";
import styled from "styled-components";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";
import ThemeStyle from "styles/theme";
import { ScrollView } from "react-native-gesture-handler";

export const ImageContainer = styled(View)`
  margin-top: ${RespScreenHeight(10)};
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const PetImage = styled(Image)`
  width: ${RespScreenWidth(25)};
  height: ${RespScreenWidth(25)};
  border-radius: ${RespScreenWidth(25)};
  background-color: ${ThemeStyle.backgroundWhite};
  resize-mode: cover;
`;

export const PetName = styled(Text)`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.lg};
`;

export const LogInfoContainer = styled(View)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${RespScreenHeight(8)};
  margin-horizontal: ${props =>
    props.label === "exercise" ? RespScreenWidth(5) : RespScreenWidth(10)};
`;

export const LogInfoLabel = styled.Text`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.xxl};
`;

export const ButtonContainer = styled.View`
  margin-top: ${RespScreenHeight(10)};
`;
