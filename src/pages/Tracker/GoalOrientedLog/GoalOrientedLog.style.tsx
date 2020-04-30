import { Image, View, Text } from "react-native";
import styled from "styled-components";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";
import ThemeStyle from "styles/theme";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export const KeyboardAvoidingViewContainer = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const ScrollViewContainer = styled(ScrollView)`
  margin-top: ${RespScreenHeight(2)};
  margin-bottom: ${RespScreenHeight(2)};
`;

export const ImageContainer = styled(View)`
  margin-top: ${RespScreenHeight(1)};
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

export const TrackInfoContainer = styled(View)`
  margin-top: ${RespScreenHeight(3)};
  flex-direction: row;
  width: ${RespScreenWidth(100)};
  justify-content: space-evenly;
`;

export const LogInfoContainer = styled(View)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${RespScreenHeight(3)};
  margin-horizontal: ${RespScreenWidth(15)};
`;

export const LogInfoLabel = styled.Text`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.xxl};
`;

export const ButtonContainer = styled(View)`
  margin-top: ${RespScreenHeight(2)};
  height: ${RespScreenHeight(20)};
`;
