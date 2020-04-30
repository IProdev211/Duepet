import * as React from "react";
import styled from "styled-components";
import { View, Text } from "react-native";
import ThemeStyle from "styles/theme";
import { FontSize, RespScreenHeight, RespScreenWidth } from "styles/sizes";

const TextContainer = styled(View)`
  margin-left: ${RespScreenWidth(1)};
  flex-direction: column;
  flex: 9;
`;

const ContentText = styled(Text)`
  font-size: ${FontSize.xl};
  color: ${ThemeStyle.descriptionTextDark};
`;

const LabelText = styled(Text)`
  font-size: ${FontSize.sm};
  color: ${ThemeStyle.descriptionTextDark};
`;

const IconContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Container = styled(View)`
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: ${ThemeStyle.backgroundDark};
  padding-vertical: ${RespScreenHeight(1.5)};
`;

export default function CustomText(props) {
  return (
    <Container>
      <TextContainer style={props.style}>
        <ContentText style={props.textStyle}>{props.value}</ContentText>
        {props.label && <LabelText>{props.label}</LabelText>}
      </TextContainer>
      <IconContainer>{props.icon}</IconContainer>
    </Container>
  );
}
