import React, { useState } from "react";
import { Image } from "react-native";
import styled from "styled-components";
import ThemeStyle from "styles/theme";
import Button from "components/SmallButton";
import { RespScreenHeight, RespScreenWidth } from "styles/sizes";
import I18nContext from "translations/I18nContext";

interface IProps {
  onPressCheck: () => void;
  onPressCancel: () => void;
}

const TrackLogCheckButton: React.FC<IProps> = ({
  onPressCheck,
  onPressCancel
}) => {
  const Container = styled.View`
    flex-direction: row;
    justify-content: space-around;
    margin-vertical: ${RespScreenHeight(2)};
  `;

  const CheckButton = styled.TouchableOpacity`
    background-color: ${ThemeStyle.backgroundLight};
    width: ${RespScreenWidth(18)};
    height: ${RespScreenWidth(18)};
    border-radius: ${RespScreenWidth(18)};
    justify-content: center;
    align-items: center;
    elevation: 5;
  `;

  const CrossButton = styled.TouchableOpacity`
    background-color: ${ThemeStyle.backgroundDark};
    width: ${RespScreenWidth(18)};
    height: ${RespScreenWidth(18)};
    border-radius: ${RespScreenWidth(18)};
    justify-content: center;
    align-items: center;
    elevation: 5;
  `;

  return (
    <Container>
      <Button padding ={true} text={I18nContext.getString("start_tracker")} onPress={onPressCheck} />
      {/* <CheckButton onPress={onPressCheck}>
        <Image
          source={require("../../../assets/images/check_log/check_log.png")}
        />
      </CheckButton>
      <CrossButton onPress={onPressCancel}>
        <Image
          source={require("../../../assets/images/cross_log/cross_log.png")}
        />
      </CrossButton> */}
    </Container>
  );
};

export default TrackLogCheckButton;
