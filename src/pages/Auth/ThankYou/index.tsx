import * as React from "react";
import { IProps } from "store/interface";
import { AuthContainer, BackButtonContainer, BottomContainer, Scene, CardStyle, CardContainer, CardSubTitle, BgStyle } from "../../../styles/designSystem";
import BackButton from "components/BackButton";
import { SecondaryButton } from "components/Button";
import DpSubTitle from "components/DpSubTitle";
import { ImageBackground } from "react-native";
import ThemeStyle from "styles/theme";
import I18nContext from "../../../translations/I18nContext";

class ThankYou extends React.Component<IProps> {

    render() {
        const { navigation } = this.props;
        return (
            <ImageBackground style={BgStyle.fullImage} source={require("../../../../assets/images/bg/bg.png")}>
                <AuthContainer>
                    <Scene>
                        <BackButtonContainer>
                            <BackButton navigation={navigation} />
                        </BackButtonContainer>
                        <CardContainer marginTop={23} style={CardStyle.Card}>
                            <DpSubTitle textColor={ThemeStyle.descriptionTextDark} subTitle={I18nContext.getString("confirm_register_head")}></DpSubTitle>
                            <CardSubTitle>{I18nContext.getString("confirm_register_body")}</CardSubTitle>
                        </CardContainer>
                    </Scene>
                    <BottomContainer>
                        <SecondaryButton onPress={() => navigation.navigate("Done")} textTransform={"uppercase"} width={100} padding={20} text={I18nContext.getString("ok")} />
                    </BottomContainer>
                </AuthContainer>
            </ImageBackground>
        )
    }
}


export default ThankYou;