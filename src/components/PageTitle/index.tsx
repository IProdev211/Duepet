import * as React from "react";
import styled from "styled-components/native";
import ThemeStyle from "styles/theme";
import { FontSize, RespScreenHeight, RespScreenWidth } from "styles/sizes";

const AppTitleText = styled.Text`
  font-size: ${FontSize.xxxxl};
  color: ${ThemeStyle.commonText};
`;

const MainTitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${RespScreenHeight(2)};
  margin-left: ${RespScreenWidth(4)};
  padding: 0px ${RespScreenWidth(2)};
`;

const SubContentWrapper = styled.View`
  margin-left: auto;
  width: ${RespScreenWidth(25)};
`;

const SubText = styled.Text`
  color: ${ThemeStyle.commonText};
  font-size: ${RespScreenWidth(4.5)};
`;

interface IProps {
  backAction?: () => void;
  backTitle?: string;
  titleSubContent?: string | React.ReactElement;
  title: string;
}

const PageTitle: React.FC<IProps> = ({ title, titleSubContent }) => {
  return (
    <MainTitleWrapper>
      <AppTitleText>{title}</AppTitleText>
      {titleSubContent ? (
        <SubContentWrapper>
          <SubText>{titleSubContent}</SubText>
        </SubContentWrapper>
      ) : null}
    </MainTitleWrapper>
  );
};

export default PageTitle;
