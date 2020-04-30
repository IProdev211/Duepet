import * as React from "react";
import { IProps } from "store/interface";
import {
  AuthContainer,
  Scene,
  InputSpacing,
  BgStyle
} from "styles/designSystem";
import CustomInput from "components/CustomInput";
import { PrimaryButton } from "components/Button";
import ErrorMessage from "components/ErrorMessage";
import DpTitle from "components/DpTitle";
import { ImageBackground, View } from "react-native";
import I18nContext from "translations/I18nContext";
import { Lock } from "components/Icons/Lock";
import PresentLoader from "components/DpActivityIndicator";
import sessionService from "service/sessionService";

interface IState extends IProps {
  updatePassword: (object) => void;
  navigation: any;
}

class ChangePassword extends React.Component<IState> {
  state = {
    isValidate: true,
    newPassword: "",
    confirmPassword: "",
    oldPassword: "",
    userData: {} as any,
  };

  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    sessionService.getStorageData("userData").then(resp => {
      if (resp && resp.token) {
        this.setState({ userData: resp });
      }
    });
  }

  changePassword = () => {
    const { newPassword, confirmPassword, oldPassword, userData} = this.state;
    const { updatePassword, navigation } = this.props;
    this.setState({ isValidate: false });
    if (newPassword !== "" && newPassword === confirmPassword && confirmPassword !== "" &&  oldPassword === userData.password) {
      updatePassword({ password: newPassword, navigation: navigation });
    }
  };

  render() {
    const { newPassword, confirmPassword, isValidate, oldPassword, userData } = this.state;
    return (
      <ImageBackground
        style={BgStyle.fullImage}
        source={require("../../../../assets/images/bg/bg.png")}
      >
        <AuthContainer>
          <Scene>
            <DpTitle
              marginTop={6}
              title={I18nContext.getString("change_password")}
            />
            <InputSpacing>
              <CustomInput
                marginHz={0.6}
                inputBtmSpacing={1.3}
                valueChange={value => {
                  this.setState({ oldPassword: value });
                }}
                placeholder={I18nContext.getString("old_password")}
                property={"oldPassword"}
                beforeIcon={<Lock />}
                password={true}
                editable
              />
              {!isValidate && oldPassword === "" ? (
                <View>
                  <ErrorMessage
                    text={I18nContext.getString("required_password")}
                  />
                </View>
              ) : !isValidate && oldPassword !== userData.password ? (
                <View>
                  <ErrorMessage text={I18nContext.getString("not_match")} />
                </View>
              ) : null}
            </InputSpacing>
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
            <PrimaryButton
              onPress={this.changePassword}
              marginTop={30}
              text={I18nContext.getString("ok")}
            />
          </Scene>
        </AuthContainer>
        <PresentLoader />
      </ImageBackground>
    );
  }
}

export default ChangePassword;
