import { ImageBackground, TouchableOpacity, Text } from "react-native";
import React from "react";
import { BgStyle, CenterScreen, Scene } from "styles/designSystem";
import DpSubTitle from "components/DpSubTitle";
import styled from "styled-components";
import I18nContext from "translations/I18nContext";
import ThemeStyle from "styles/theme";
import { FontSize, RespScreenHeight, RespScreenWidth } from "styles/sizes";

const ButtonContainer = styled(TouchableOpacity)`
  background-color: ${ThemeStyle.backgroundDark};
  margin-top: ${RespScreenHeight(2)};
  margin-bottom: ${RespScreenHeight(1)};
  margin-horizontal: ${RespScreenWidth(25)};
  padding: ${RespScreenHeight(1.2)};
  border-radius: ${RespScreenHeight(1.5)};
  align-items: center;
`;

const ButtonText = styled(Text)`
  font-size: ${FontSize.xl};
  color: ${ThemeStyle.commonText};
`;

class ForceUpdate extends React.Component {
    render() {
        return (
            <ImageBackground style={BgStyle.fullImage} source={require("../../../../assets/images/bg/bg.png")}>
                <Scene>
                    <CenterScreen>
                        <DpSubTitle
                            center={true}
                            fontBold={true}
                            subTitle={I18nContext.getString("system_update")}>
                        </DpSubTitle>
                        <ButtonContainer>
                            <ButtonText>
                                {I18nContext.getString("update")}
                            </ButtonText>
                        </ButtonContainer>
                    </CenterScreen>
                </Scene>
            </ImageBackground>
        )
    }
}

export default ForceUpdate;