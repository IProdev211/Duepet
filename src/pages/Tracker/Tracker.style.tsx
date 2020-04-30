import styled from "styled-components";
import ThemeStyle from "styles/theme";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";
import I18nContext from "translations/I18nContext";

export const ScrollViewContainer = styled.ScrollView`
  margin-top: ${RespScreenHeight(1.5)};
  margin-bottom: 100px;
  padding: ${RespScreenHeight(1.5)} ${RespScreenWidth(2)};
`;

export const PetsCarouselWrapper = styled.View``;

export const TrackerItemsContainer = styled.View`
  padding: ${RespScreenHeight(1)};
`;

export const DashboardHeadingContainer = styled.View`
  margin-top: ${RespScreenHeight(4)};
`;

export const DashboardHeadingText = styled.Text`
  margin-left: ${RespScreenWidth(6)};
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.lg};
`;

export const DashboardItemsView = styled.View`
  margin-left: ${RespScreenWidth(6)};
  margin-top: ${RespScreenHeight(1)}
  flex-direction: row;
`;

export const HeaderItemLabelText = styled.Text`
  width: ${RespScreenWidth(20)};
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.lg};
`;

export const HeaderItemLatestText = styled.Text`
  width: ${RespScreenWidth(25)};
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.lg};
`;

export const HeaderItemGoalText = styled.Text`
  width: ${RespScreenWidth(20)};
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.lg};
`;

export const TrackerWarning = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-horizontal: ${RespScreenWidth(3)};
`;

export const TrackerWarningText = styled.Text`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.xxl};
  text-align: center;
`;
