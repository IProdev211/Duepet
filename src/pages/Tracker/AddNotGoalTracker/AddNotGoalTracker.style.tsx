import { Image, View, Text } from "react-native";
import styled from "styled-components";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";
import ThemeStyle from "styles/theme";

export const ImageContainer = styled(View)`
  margin-top: ${RespScreenHeight(6)};
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

export const NoteText = styled.Text`
  margin-top: ${RespScreenHeight(9)};
  margin-bottom: ${RespScreenHeight(7)};
  text-align: center;
  font-size: ${FontSize.xxl};
  color: ${ThemeStyle.commonText};
`;
