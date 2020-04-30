import * as React from "react";
import { IProps } from "store/interface";
import {
  AuthContainer,
  Scene,
  InputSpacing,
  BottomContainer,
  BgStyle
} from "styles/designSystem";
import CustomInput from "components/CustomInput";
import { PrimaryButton, SecondaryButton } from "components/Button";
import BottomText from "components/BottomText";
import { LoginModel } from "interface/login.model";
import ErrorMessage from "components/ErrorMessage";
import httpService from "service/httpService";
import DpTitle from "components/DpTitle";
import sessionService from "service/sessionService";
import authService from "service/authService";
import { ImageBackground, View } from "react-native";
import I18nContext from "translations/I18nContext";
import { Mail } from "components/Icons/Mail";
import { Lock } from "components/Icons/Lock";
import PresentLoader from "components/DpActivityIndicator";
import Apis from "constants/AppApis";
import { connect } from "react-redux";
import {
  getPetTypes,
  getPetByUser,
  setLoader,
  getTrackerByUser,
  setDialog,
  setDialogTitle,
  setDialogContain,
  setDialogFooter
} from "../../../redux/actions";
import { NavigationEvents } from "react-navigation";
import PopupDialog from "components/CustomPopupDialog";

interface IState extends IProps {
  getPetTypes: () => {};
  getPetByUser: (value: string) => {};
  getTrackerByUser: () => void;
  showLoader: (value: boolean) => {};
  setDialog: (value: boolean) => {};
  setDialogTitle: (value: string) => {};
  setDialogContain: (value: any) => {};
  setDialogFooter: (value: boolean) => {};
  petTypesLoading: boolean;
  petLoading: boolean;
  trackerLoading: boolean;
  petTypes: any;
  userPets: any;
}

class Login extends React.Component<IState> {
  state = {
    isValidate: true,
    loginData: {} as LoginModel
  };

  constructor(props) {
    super(props);
    this.setLoginData = this.setLoginData.bind(this);
  }

  setLoginData(value, property) {
    const object = this.state.loginData;
    object[property] = value;
    this.setState({ loginData: object });
  }

  async doLogin() {
    const { getPetTypes, getPetByUser, getTrackerByUser } = this.props;
    try {
      this.setState({ isValidate: false });
      this.props.showLoader(true);
      const loginData: any = {};
      loginData.user = this.state.loginData;
      const response: any = await httpService.postRequest(
        loginData,
        Apis.login
      );
      this.props.showLoader(false);
      authService.authErrorAlert(response, this.props);
      if (response.user && response.user.token) {
        const userData = response.user;
        userData.password = this.state.loginData.password;
        await sessionService.setStorageData("userData", userData);
        getPetTypes();
        getTrackerByUser();
        getPetByUser(response.user.id);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  onDidBlur = () => {
    this.props.showLoader(false);
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { petTypesLoading, petLoading, trackerLoading } = this.props;
    if (
      prevProps.petTypesLoading !== petTypesLoading ||
      prevProps.petLoading !== petLoading ||
      prevProps.trackerLoading !== trackerLoading
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      navigation,
      userPets,
      petTypesLoading,
      petLoading,
      trackerLoading
    } = this.props;
    if (snapshot) {
      if (userPets && petTypesLoading && petLoading && trackerLoading) {
        if (userPets.petsCount > 0) {
          navigation.navigate("Schedule");
        } else {
          navigation.navigate("AddPetProfileTitle");
        }
      }
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground
        style={BgStyle.fullImage}
        source={require("../../../../assets/images/bg/bg.png")}
      >
        <NavigationEvents onDidBlur={payload => this.onDidBlur()} />
        <AuthContainer>
          <Scene>
            <DpTitle
              marginTop={6}
              title={I18nContext.getString("login_title")}
            />
            <InputSpacing>
              <CustomInput
                marginHz={0.6}
                inputBtmSpacing={1.3}
                valueChange={this.setLoginData}
                property={"email"}
                beforeIcon={<Mail />}
                placeholder={I18nContext.getString("email")}
                editable
              />
              {!this.state.isValidate &&
              this.state.loginData.email === undefined ? (
                <View>
                  <ErrorMessage
                    text={I18nContext.getString("required_email")}
                  />
                </View>
              ) : null}
            </InputSpacing>
            <InputSpacing>
              <CustomInput
                marginHz={0.6}
                inputBtmSpacing={1.3}
                valueChange={this.setLoginData}
                placeholder={I18nContext.getString("password")}
                property={"password"}
                beforeIcon={<Lock />}
                password={true}
                editable
              />
              {!this.state.isValidate &&
              this.state.loginData.password === undefined ? (
                <View>
                  <ErrorMessage
                    text={I18nContext.getString("required_password")}
                  />
                </View>
              ) : null}
            </InputSpacing>
            <PrimaryButton
              onPress={() => this.doLogin()}
              marginTop={30}
              text={I18nContext.getString("btn_login")}
            />
          </Scene>
          <BottomContainer bottom={14}>
            <BottomText
              onPress={() => navigation.navigate("ForgotPassword")}
              text={I18nContext.getString("forgotten_password")}
            />
          </BottomContainer>
          <BottomContainer>
            <SecondaryButton
              onPress={() => navigation.navigate("Registration")}
              textTransform={"uppercase"}
              width={100}
              padding={20}
              text={I18nContext.getString("btn_register")}
            />
          </BottomContainer>
        </AuthContainer>
        <PresentLoader />
        <PopupDialog />
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    petTypesLoading: state.petReducer.petTypesLoading,
    petLoading: state.petReducer.petLoading,
    petTypes: state.petReducer.petTypes,
    userPets: state.petReducer.userPets,
    trackerLoading: state.trackerReducer.trackerLoading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPetTypes: () => dispatch(getPetTypes()),
    getPetByUser: userid => dispatch(getPetByUser(userid)),
    getTrackerByUser: () => dispatch(getTrackerByUser()),
    showLoader: value => dispatch(setLoader(value)),
    setDialog: value => dispatch(setDialog(value)),
    setDialogTitle: value => dispatch(setDialogTitle(value)),
    setDialogContain: value => dispatch(setDialogContain(value)),
    setDialogFooter: value => dispatch(setDialogFooter(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
