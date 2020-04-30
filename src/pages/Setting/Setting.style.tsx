import { View, Text, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ThemeStyle from "styles/theme";
import styled from "styled-components";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";

export const TimezonePickerContainer = styled(View)`
  margin-top: ${RespScreenHeight(2)};
`;

export const StatusText = styled(Text)`
  font-size: ${FontSize.lg};
  color: ${ThemeStyle.commonText};
  align-self: center;
  margin-top: ${RespScreenHeight(0.5)};
`;

export const Notification = styled(Text)`
  font-size: ${FontSize.md};
  color: ${ThemeStyle.commonText};
  align-self: center;
  margin-top: ${RespScreenHeight(0.5)};
`;

export const ScrollViewContainer = styled(ScrollView)`
  margin-top: ${RespScreenHeight(1)};
  margin-bottom: 100px;
`;

export const VersionContainer = styled(View)`
  padding-horizontal: ${RespScreenWidth(7)};
`;

export const ActivityIndicatorContainer = styled(ActivityIndicator)`
  flex: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  align-items: center;
  justify-content: center;
`;
