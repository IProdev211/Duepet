import * as React from "react";
import {
  Scene,
  BottomContainer,
  AuthContainer,
  BgStyle
} from "styles/designSystem";
import CustomInput from "components/CustomInput";
import styled from "styled-components";
import { IProps } from "store/interface";
import { View, ImageBackground } from "react-native";
import { PrimaryButton, SecondaryButton } from "components/Button";
import BottomText from "components/BottomText";
import { Register } from "interface/register.model";
import ErrorMessage from "components/ErrorMessage";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import httpService from "service/httpService";
import { connect } from "react-redux";
import authService from "service/authService";
import DpTitle from "components/DpTitle";
import I18nContext from "translations/I18nContext";
import { User } from "components/Icons/User";
import { Mail } from "components/Icons/Mail";
import PresentLoader from "components/DpActivityIndicator";
import { Lock } from "components/Icons/Lock";
import Apis from "constants/AppApis";
import {
  setLoader,
  setDialog,
  setDialogTitle,
  setDialogContain,
  setDialogFooter
} from "../../../redux/actions";
const InputSpacing = styled(View)`
  margin-top: ${hp("3.5%") + "px"};
  margin-bottom: ${hp("3.5%") + "px"};
`;

interface IState extends IProps {
  showLoader: (value: boolean) => {};
  setDialog: (value: boolean) => {};
  setDialogTitle: (value: string) => {};
  setDialogContain: (value: any) => {};
  setDialogFooter: (value: boolean) => {};
}

class Registration extends React.Component<IState> {
  state = {
    isValidate: true,
    userData: {} as Register
  };
  constructor(props) {
    super(props);
    this.setRegisterData = this.setRegisterData.bind(this);
  }

  setRegisterData(value, property) {
    const object = this.state.userData;
    object[property] = value;
    this.setState({ userData: object });
  }

  async doRegister() {
    try {
      this.setState({ isValidate: false });
      if (this.state.userData.email !== undefined && this.state.userData.email !== "" && this.state.userData.password !== undefined && this.state.userData.password !== "" && this.state.userData.name !== "" && this.state.userData.name !== undefined) {
        this.props.showLoader(true);
        const registerData: any = {};
        registerData.user = this.state.userData;
        const resp: any = await httpService.postRequest(
          registerData,
          Apis.register
        );
        this.props.showLoader(false);
        authService.authErrorAlert(resp, this.props);
        if (resp.user && resp.user.token) {
          this.props.navigation.navigate("ThankYou");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground
        style={BgStyle.fullImage}
        source={require("../../../../assets/images/bg/bg.png")}
      >
        <AuthContainer>
          <Scene>
            <DpTitle
              marginTop={6}
              title={I18nContext.getString("register_title")}
            />
            <InputSpacing>
              <CustomInput
                inputBtmSpacing={1.3}
                marginHz={0.6}
                valueChange={this.setRegisterData}
                property={"name"}
                placeholder={I18nContext.getString("full_name")}
                beforeIcon={<User />}
                editable
              />
              {!this.state.isValidate &&
                this.state.userData.name === undefined ? (
                  <View>
                    <ErrorMessage
                      text={I18nContext.getString("required_full_name")}
                    />
                  </View>
                ) : null}
            </InputSpacing>
            <InputSpacing>
              <CustomInput
                inputBtmSpacing={1.3}
                marginHz={0.6}
                valueChange={this.setRegisterData}
                property={"email"}
                beforeIcon={<Mail />}
                placeholder={I18nContext.getString("email")}
                editable
              />
              {!this.state.isValidate &&
                this.state.userData.email === undefined ? (
                  <View>
                    <ErrorMessage text={I18nContext.getString("required_email")} />
                  </View>
                ) : null}
            </InputSpacing>
            <InputSpacing>
              <CustomInput
                inputBtmSpacing={1.3}
                marginHz={0.6}
                valueChange={this.setRegisterData}
                property={"password"}
                placeholder={I18nContext.getString("password")}
                beforeIcon={<Lock />}
                password={true}
                editable
              />
              {!this.state.isValidate &&
                this.state.userData.password === undefined ? (
                  <View>
                    <ErrorMessage
                      text={I18nContext.getString("required_password")}
                    />
                  </View>
                ) : null}
            </InputSpacing>
            <PrimaryButton
              onPress={() => this.doRegister()}
              marginTop={30}
              text={I18nContext.getString("continue")}
            />
          </Scene>
          <BottomContainer bottom={13}>
            <BottomText
              onPress={() => navigation.navigate("Login")}
              text={I18nContext.getString("alreay_have_account")}
            />
          </BottomContainer>
          <BottomContainer>
            <SecondaryButton
              onPress={() => navigation.navigate("Login")}
              textTransform={"uppercase"}
              width={100}
              padding={20}
              text={I18nContext.getString("login")}
            />
          </BottomContainer>
        </AuthContainer>
        <PresentLoader />
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    showLoader: value => dispatch(setLoader(value)),
    setDialog: value => dispatch(setDialog(value)),
    setDialogTitle: value => dispatch(setDialogTitle(value)),
    setDialogContain: value => dispatch(setDialogContain(value)),
    setDialogFooter: value => dispatch(setDialogFooter(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
