import React, { ReactNode } from "react";
import styled from "styled-components";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ThemeStyle from "./theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontSize, RespScreenHeight, RespScreenWidth } from "./sizes";
import ThemeVariables from "styles/themeVariables";
import { MaterialIcons } from '@expo/vector-icons';

export const Scene = styled(View)`
  margin: ${hp("3%") + "px"};
  height: 100%;
`;

export const BodySpecing = styled(View)`
  margin: ${hp("3%") + "px"};
`;

export const BottomContainer = styled(View)`
  position: absolute;
  bottom: ${props => (props.bottom ? hp(props.bottom + "%") + "px" : "0px")};
  align-items: center;
  width: 100%;
`;

export const BackButtonContainer = styled(View)`
  margin-top: ${props =>
    props.marginTop ? hp(props.marginTop + "%") + "px" : hp("4%") + "px"};
  margin-bottom: ${props =>
    props.marginBottom ? hp(props.marginBottom + "%") + "px" : hp("4%") + "px"};
`;

export const AuthContainer = styled(View)`
  height: 100%;
`;

export const BgStyle = StyleSheet.create({
  fullImage: {
    width: "100%",
    height: "100%"
  }
});

export const AppContainer = props => {
  return (
    <LinearGradient
      colors={[
        ThemeVariables["light"].appBackgourndGradientStartColor,
        ThemeVariables["light"].appBackgourndGradientEndColor
      ]}
      style={{ height: "100%" }}
    >
      {props.children}
    </LinearGradient>
  );
};

export const CustomContainer = styled(View)`
  flex-direction: column;
  margin-horizontal: ${props =>
    props.marginHz ? RespScreenWidth(props.marginHz) : RespScreenWidth(6)};
  padding-bottom: 5px;
  padding-top: 5px;
`;

export const CustomInputContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${RespScreenHeight(1)};
  padding-horizontal: ${RespScreenWidth(1)};
  border-bottom-width: ${props => (props.underline ? "1px" : "0px")};
  border-color: ${props =>
    props.setting ? ThemeStyle.descriptionTextDark : ThemeStyle.commonText};
  padding-bottom: ${props =>
    props.inputBtmSpacing
      ? RespScreenHeight(props.inputBtmSpacing)
      : RespScreenHeight(0)};
`;

export const Input = styled(TextInput)`
  flex: 1;
  flex-direction: row;
  font-size: ${FontSize.xl};
  color: ${props =>
    props.setting ? ThemeStyle.descriptionTextDark : ThemeStyle.commonText};
  margin-left: ${props =>
    props.beforeIcon ? RespScreenWidth(4) : RespScreenWidth(0)};
  opacity: ${props => (props.opacity ? 0.5 : 1)};
  text-align: ${props => (props.textAlignRight ? "right" : "left")};
`;

export const CustomLabelText = styled(Text)`
  font-size: ${FontSize.sm};
  color: ${ThemeStyle.commonText};
  margin-top: ${RespScreenHeight(1)};
`;

export const CloseButton = styled.TouchableOpacity`
  flex-direction: row-reverse;
  padding-right: 3px;
  padding-top: 3px;
`;

export const TitleView = styled.View`
  flex: 9;
`;

export const DialogText = styled(Text)`
  
`;

export const PetImageSlider = styled(View)`
  margin-bottom: ${RespScreenHeight(3)};
`;

export const CustomIconContainer = styled(View)`
  margin-top: auto;
  margin-bottom: auto;
`;

export const ScrollContainer = styled(ScrollView)`
  margin-top: ${props =>
    props.marginTop ? RespScreenHeight(props.marginTop) : RespScreenHeight(3)};
`;

export const KeyboardAvoiding = styled(KeyboardAvoidingView)`
  flex: 1;
  flex-direction: column;
  margin-bottom: ${RespScreenHeight(15)};
`;

export const InputSpacing = styled(View)`
  margin-top: ${hp("3%") + "px"};
  margin-bottom: ${hp("3%") + "px"};
`;
export const CardContainer = styled(View)`
  width: 100%;
  padding: 20px;
  margin-top: ${props =>
    props.marginTop ? hp(props.marginTop + "%") + "px" : hp("0%")};
`;


export const CheckMarkIcon = styled(MaterialIcons)`
color: ${ThemeStyle.commonText};
`

export const CardSubTitle = styled(Text)`
  color: ${ThemeStyle.descriptionTextLight};
  font-size: ${FontSize.sm};
  text-align: center;
  font-weight: bold;
`;
export const CenterScreen = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const CardStyle = StyleSheet.create({
  Card: {
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    alignItems: "center",
    elevation: 12,
    backgroundColor: "white" // invisible color
  }
});
