import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import ThemeStyle from "styles/theme";
import { FontSize, RespScreenWidth } from "styles/sizes";
import I18nContext from "translations/I18nContext";

const TrackerRatingScale: React.FC = () => {
  const Container = styled.View`
    flex-direction: column;
    align-items: center;
  `;

  const ScaleBarView = styled.View`
    width: 80%;
    flex-direction: column;
  `;

  const ScaleText = styled.Text`
    color: ${ThemeStyle.commonText};
    font-size: ${FontSize.sm};
  `;

  const ScaleBar = styled.View`
    flex-direction: row;
  `;

  const ScaleItem = styled.View`
    background-color: ${props =>
      ThemeStyle["chartBar_level_" + `${props.rating}`]};
    height: ${RespScreenWidth(5)};
    flex: 0.2;
    justify-content: center;
    align-items: center;
    flex: 1;
  `;

  const ItemText = styled.Text`
    color: ${ThemeStyle.commonText};
    font-size: ${FontSize.sm};
  `;

  const Footer = styled.View`
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
  `;

  const FooterText = styled.Text`
    color: ${ThemeStyle.commonText};
    font-size: ${FontSize.xs};
  `;

  return (
    <Container>
      <ScaleBarView>
        <ScaleText>{I18nContext.getString("scale")}</ScaleText>
        <ScaleBar>
          <ScaleItem rating="1">
            <ItemText>1</ItemText>
          </ScaleItem>
          <ScaleItem rating="2">
            <ItemText>2</ItemText>
          </ScaleItem>
          <ScaleItem rating="3">
            <ItemText>3</ItemText>
          </ScaleItem>
          <ScaleItem rating="4">
            <ItemText>4</ItemText>
          </ScaleItem>
          <ScaleItem rating="5">
            <ItemText>5</ItemText>
          </ScaleItem>
        </ScaleBar>
      </ScaleBarView>
      <Footer>
        <FooterText>{I18nContext.getString("normal")}</FooterText>
        <FooterText>{I18nContext.getString("very_bad")}</FooterText>
      </Footer>
    </Container>
  );
};

export default TrackerRatingScale;
