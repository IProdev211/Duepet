import { IProps } from "store/interface";
import React from "react";
import {
  AuthContainer,
  Scene,
  InputSpacing,
  BgStyle,
  DialogText,
  BottomContainer
} from "styles/designSystem";
import DpTitle from "components/DpTitle";
import CustomInput from "components/CustomInput";
import ErrorMessage from "components/ErrorMessage";
import { PrimaryButton, SecondaryButton } from "components/Button";
import { ImageBackground, View, Platform, Alert } from "react-native";
import I18nContext from "../../../translations/I18nContext";
import { Mail } from "components/Icons/Mail";
import { Lock } from "components/Icons/Lock";
import Apis from "constants/AppApis";
import { connect } from "react-redux";
import httpService from "service/httpService";
import {
  setLoader,
  setDialog,
  setDialogTitle,
  setDialogContain,
  setDialogFooter
} from "../../../redux/actions";

interface IState extends IProps {
  showLoader: (value) => {};
  setDialogTitle: (value) => {};
  setDialogFooter: (value) => {};
  setDialogContain: (value) => {};
  setDialog: (value) => {};
}

class ForgotPassword extends React.Component<IState> {
  state = {
    isValidate: true,
    newPassword: "",
    confirmPassword: "",
    code: "",
    changePassword: false,
    forgotData: {
      email: ""
    }
  };

  submitNewPassword = async () => {
    this.setState({ isValidate: false });
    if (
      this.state.code !== "" &&
      this.state.newPassword !== "" &&
      this.state.confirmPassword !== "" &&
      this.state.newPassword === this.state.confirmPassword
    ) {
      this.props.showLoader(true);
      const response: any = await httpService.postRequest(
        {
          "password-reset": {
            passwordResetToken: this.state.code,
            password: this.state.newPassword,
            passwordConfirm: this.state.confirmPassword
          }
        },
        Apis.changePassword
      );
      this.props.showLoader(false);
      if (response && response.errors) {
        if (Platform.OS === "ios") {
          this.props.setDialogTitle("opps!");
          this.props.setDialogFooter(true);
          this.props.setDialogContain(
            <DialogText>{"Please enter valid code."}</DialogText>
          );
          this.props.setDialog(true);
        } else {
          Alert.alert("opps!", "Please enter valid code.");
        }
      }
      if (response === 200) {
        if (Platform.OS === "ios") {
          this.props.setDialogTitle("Success");
          this.props.setDialogFooter(true);
          this.props.setDialogContain(
            <DialogText>{"Password change successfully."}</DialogText>
          );
          this.props.setDialog(true);
        } else {
          Alert.alert("Success", "Password change successfully.");
        }
        this.props.navigation.navigate("Login");
      }
    }
  };

  sendResetLink = async () => {
    this.setState({ isValidate: false });
    if (this.state.forgotData.email !== "") {
      this.props.showLoader(true);
      const forgotEmail: any = {};
      forgotEmail["forgot-password"] = this.state.forgotData;
      const response: any = await httpService.postRequest(
        forgotEmail,
        Apis.forgotPassword
      );
      this.props.showLoader(false);
      if (response === 200) {
        this.setState({ isValidate: true });
        this.setState({ changePassword: !this.state.changePassword });
        if (Platform.OS === "ios") {
          this.props.setDialogTitle("Success");
          this.props.setDialogFooter(true);
          this.props.setDialogContain(
            <DialogText>{"code is send on email."}</DialogText>
          );
          this.props.setDialog(true);
        } else {
          Alert.alert("Success", "code is send on email.");
        }
      }
      if (
        response &&
        response.message === "RESET_PASSWORD.EMAIL_SENDED_RECENTLY"
      ) {
        if (Platform.OS === "ios") {
          this.setState({ isValidate: true });
          this.setState({ changePassword: !this.state.changePassword });
          this.props.setDialogTitle("opps!");
          this.props.setDialogFooter(true);
          this.props.setDialogContain(
            <DialogText>{"code is already sended on email."}</DialogText>
          );
          this.props.setDialog(true);
        } else {
          Alert.alert("opps!", "code is already sended on email.");
        }
      }
      if (response.errors) {
        if (Platform.OS === "ios") {
          this.props.setDialogTitle("opps!");
          this.props.setDialogFooter(true);
          this.props.setDialogContain(
            <DialogText>{"Email is not registered at our system."}</DialogText>
          );
          this.props.setDialog(true);
        } else {
          Alert.alert("opps!", "Email is not registered at our system.");
        }
      }
    }
  };

  setForgotData = (value, property) => {
    const object = this.state.forgotData;
    object[property] = value;
    this.setState({ userData: object });
  };

  render() {
    const {
      newPassword,
      confirmPassword,
      isValidate,
      changePassword
    } = this.state;
    return (
      <ImageBackground
        style={BgStyle.fullImage}
        source={require("../../../../assets/images/bg/bg.png")}
      >
        <AuthContainer>
          <Scene>
            <DpTitle
              marginTop={6}
              title={I18nContext.getString("forgot_password_title")}
            />
            <InputSpacing>
              <CustomInput
                marginHz={0.6}
                inputBtmSpacing={1.3}
                beforeIcon={<Mail />}
                valueChange={this.setForgotData}
                property={"email"}
                placeholder={I18nContext.getString("email")}
                iconName="email"
                editable={true}
              />
              {!this.state.isValidate && this.state.forgotData.email === "" ? (
                <View>
                  <ErrorMessage
                    text={I18nContext.getString("required_email")}
                  />
                </View>
              ) : null}
            </InputSpacing>
            {changePassword && (
              <InputSpacing>
                <CustomInput
                  marginHz={0.6}
                  inputBtmSpacing={1.3}
                  valueChange={value => {
                    this.setState({ code: value });
                  }}
                  property={"code"}
                  placeholder={I18nContext.getString("code")}
                  editable={true}
                />
                {!this.state.isValidate && this.state.code === "" ? (
                  <View>
                    <ErrorMessage
                      text={I18nContext.getString("required_code")}
                    />
                  </View>
                ) : null}
              </InputSpacing>
            )}
            {changePassword && (
              <InputSpacing>
                <CustomInput
                  marginHz={0.6}
                  inputBtmSpacing={1.3}
                  valueChange={value => {
                    this.setState({ newPassword: value });
                  }}
                  placeholder={I18nContext.getString("new_password")}
                  property={"newPassword"}
                  beforeIcon={<Lock />}
                  password={true}
                  editable
                />
                {!isValidate && newPassword === "" ? (
                  <View>
                    <ErrorMessage
                      text={I18nContext.getString("required_password")}
                    />
                  </View>
                ) : null}
              </InputSpacing>
            )}
            {changePassword && (
              <InputSpacing>
                <CustomInput
                  marginHz={0.6}
                  inputBtmSpacing={1.3}
                  valueChange={value => {
                    this.setState({ confirmPassword: value });
                  }}
                  placeholder={I18nContext.getString("confirm_password")}
                  beforeIcon={<Lock />}
                  password={true}
                  editable
                />
                {!isValidate && confirmPassword === "" ? (
                  <View>
                    <ErrorMessage
                      text={I18nContext.getString("required_password")}
                    />
                  </View>
                ) : !isValidate && confirmPassword !== newPassword ? (
                  <View>
                    <ErrorMessage text={I18nContext.getString("not_match")} />
                  </View>
                ) : null}
              </InputSpacing>
            )}
            {changePassword && (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                <View style={{ flex: 0.4 }}>
                  <PrimaryButton
                    onPress={() => {
                      this.setState({ changePassword: !changePassword });
                      this.setState({ isValidate: false });
                    }}
                    marginTop={30}
                    text={I18nContext.getString("cancel")}
                  />
                </View>
                <View style={{ flex: 0.4 }}>
                  <PrimaryButton
                    onPress={() => {
                      this.submitNewPassword();
                    }}
                    marginTop={30}
                    text={I18nContext.getString("submit")}
                  />
                </View>
              </View>
            )}
            {!changePassword && (
              <PrimaryButton
                onPress={() => this.sendResetLink()}
                marginTop={30}
                text={I18nContext.getString("send")}
              />
            )}
          </Scene>
          <BottomContainer>
            <SecondaryButton
              onPress={() => this.props.navigation.navigate("Login")}
              textTransform={"uppercase"}
              width={100}
              padding={20}
              text={I18nContext.getString("login")}
            />
          </BottomContainer>
        </AuthContainer>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showLoader: value => dispatch(setLoader(value)),
    setDialog: value => dispatch(setDialog(value)),
    setDialogTitle: value => dispatch(setDialogTitle(value)),
    setDialogContain: value => dispatch(setDialogContain(value)),
    setDialogFooter: value => dispatch(setDialogFooter(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
