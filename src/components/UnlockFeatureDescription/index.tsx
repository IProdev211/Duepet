import * as React from "react";
import styled from "styled-components";
import { Text, View } from "react-native";
import ThemeStyle from "styles/theme";
import { FontSize, RespScreenHeight, RespScreenWidth } from "styles/sizes";
import I18nContext from "translations/I18nContext";

const titleText = "unlock all features with DuePet Family member";
const descriptionText =
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita";

const Title = styled(Text)`
  color: ${ThemeStyle.descriptionTextDark};
  font-size: ${FontSize.md};
  font-weight: bold;
  text-align: center;
`;

const Description = styled(Text)`
  color: ${ThemeStyle.descriptionTextLight};
  font-size: ${FontSize.md};
  margin-top: 5px;
`;

const DescriptionContainer = styled(View)`
align-items : center;
`

const Background = styled(View)`
  elevation: 5;
  background-color: #fff;
  margin-top: ${RespScreenWidth(10)};
  margin-horizontal: ${RespScreenWidth(10)};
  padding-horizontal: ${RespScreenWidth(5)};
  padding-vertical: ${RespScreenHeight(3)};
  justify-content: center;
`;

export default function UnlockFeatureDescription(props) {
  return (
    <Background>
      <Title>{I18nContext.getString("upgrade_description")}</Title>
      <DescriptionContainer>
        <Description>{I18nContext.getString("upgrade_description_list")}</Description>
      </DescriptionContainer>
    </Background>
  );
}
