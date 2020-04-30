import { Image, View, Text } from "react-native";
import styled from "styled-components";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";
import ThemeStyle from "styles/theme";
import { ScrollView } from "react-native-gesture-handler";

export const ImageContainer = styled(View)`
  width: ${RespScreenWidth(25)};
  height: ${RespScreenWidth(25)};
  border-radius: ${RespScreenWidth(25)};
  align-items: center;
  justify-content: center;
  align-self: center;
  elevation: 3;
`;

export const PetImage = styled(Image)`
  width: ${RespScreenWidth(25)};
  height: ${RespScreenWidth(25)};
  border-radius: ${RespScreenWidth(25)};
  background-color: ${ThemeStyle.backgroundWhite};
  resize-mode: cover;
`;

export const ChartSpace = styled(View)`
margin-bottom : ${RespScreenHeight(4)};
`

export const MenuListContainer = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  margin-top: ${RespScreenHeight(4)};
`;

export const MenuItemContainer = styled(View)`
  align-items: center;
  flex-direction: row;
`;

export const MenuItemText = styled(Text)`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.xl};
  margin-left: 5px;
`;

export const DropDownListContainer = styled(View)`
  width: ${RespScreenWidth(50)};
  align-self: center;
`;

export const PetNameText = styled.Text`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.xl};
  text-align: center;
`;

export const ScrollViewContainer = styled(ScrollView)`
  margin-top: ${RespScreenHeight(3)};
  margin-bottom: ${RespScreenHeight(15)};
`;

export const DescriptionContainer = styled(View)`
  height: ${RespScreenHeight(20)};
  background-color: ${ThemeStyle.backgroundWhite};
  border-radius: 15px;
  padding-vertical: ${RespScreenHeight(2)};
`;

export const CarouselContainer = styled(View)`
  margin-top: ${RespScreenHeight(2)};
  margin-horizontal: ${RespScreenWidth(2)};
`;

export const DescriptionTitle = styled(View)`
  height: ${RespScreenHeight(3)}
  border-bottom-width: 0.3px;
  padding-horizontal: ${RespScreenHeight(2)};
  align-items: center;
`;

export const ChartContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: ${RespScreenWidth(2)};
`;

export const Description = styled(View)`
  padding-vertical: ${RespScreenHeight(1)};
  padding-horizontal: ${RespScreenWidth(2)};
`;

export const ChartTitleText = styled.Text`
  flex: 7;
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.xxxxl};
  font-weight: bold;
  margin-left: ${RespScreenWidth(5)};
  margin-bottom: ${RespScreenHeight(0.1)};
`;

export const PetContainer = styled.View`
  padding-left: ${RespScreenHeight(2)};
  flex-direction: row;
`;
