import { View, Text, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";
import { FontSize, RespScreenHeight } from "styles/sizes";
import ThemeStyle from "styles/theme";

export const ImageItem = styled(Image)`
  flex: 1;
  margin-horizontal: 2px;
  margin-bottom: 5px;
  border-width: ${props => (props.border ? "5px" : "0")};
  border-color: ${ThemeStyle.backgroundWhite};
`;

export const ImageItemContainer = styled(TouchableOpacity)`
  flex: 1;
  aspect-ratio: 1;
`;

export const FooterContainer = styled(View)`
  justify-content: center;
  align-items: center;
  height: ${RespScreenHeight(8)};
  flex-direction: row;
`;

export const FooterText = styled(Text)`
  opacity: 0.7;
  margin-left: 8px;
  color: ${ThemeStyle.commonText};
`;

export const FlatListContainer = styled(View)`
  margin-bottom: ${RespScreenHeight(9.5)};
`;

export const HeaderContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-vertical: ${RespScreenHeight(1)};
`;

export const HeaderText = styled(Text)`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.lg};
`;
