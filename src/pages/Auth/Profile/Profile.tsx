import React from "react";
import {
  AuthContainer,
  Scene,
  InputSpacing,
  BgStyle
} from "styles/designSystem";
import { View } from "react-native";
import DpTitle from "components/DpTitle";
import CustomInput from "components/CustomInput";
import ErrorMessage from "components/ErrorMessage";
import { PrimaryButton } from "components/Button";
import { ImageBackground } from "react-native";
import I18nContext from "translations/I18nContext";
import { Mail } from "components/Icons/Mail";
import sessionService from "service/sessionService";

interface IProps {
  navigation: any;
  updateEmail: (object) => void;
}

class Profile extends React.Component<IProps> {
  state = {
    email: "",
    newEmail: "",
    isValidate: false,
    isSubmit: false
  };

  static navigationOptions = {
    headerShown: false
  };


  async componentDidMount() {
    const userData = await sessionService.getStorageData("userData");
    this.setState({ email: userData.email });
  }

  render() {
    const { isValidate, newEmail } = this.state;
    const { updateEmail, navigation } = this.props;
    return (
      <ImageBackground
        style={BgStyle.fullImage}
        source={require("../../../../assets/images/bg/bg.png")}
      >
        <AuthContainer>
          <Scene>
            <DpTitle
              marginTop={6}
              title={I18nContext.getString("my_profile")}
            />
            <InputSpacing>
              <CustomInput
                marginHz={0.6}
                inputBtmSpacing={1.3}
                beforeIcon={<Mail />}
                value={this.state.email}
                iconName="email"
                editable={false}
              />
            </InputSpacing>
            {isValidate && (
              <InputSpacing>
                <CustomInput
                  marginHz={0.6}
                  inputBtmSpacing={1.3}
                  beforeIcon={<Mail />}
                  valueChange={value => {
                    this.setState({ newEmail: value });
                  }}
                  placeholder={I18nContext.getString("email")}
                  editable={true}
                />
                {this.state.isSubmit && newEmail === "" ? (
                  <View>
                    <ErrorMessage
                      text={I18nContext.getString("required_email")}
                    />
                  </View>
                ) : null}
              </InputSpacing>
            )}
            {!isValidate && (
              <PrimaryButton
                onPress={() => {
                  this.setState({ isValidate: !this.state.isValidate });
                }}
                marginTop={30}
                text={I18nContext.getString("change")}
              />
            )}
            {isValidate && (
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
                      this.setState({ isValidate: !this.state.isValidate });
                    }}
                    marginTop={30}
                    text={I18nContext.getString("cancel")}
                  />
                </View>
                <View style={{ flex: 0.4 }}>
                  <PrimaryButton
                    onPress={() => {
                      this.setState({ isSubmit: true });
                      if (newEmail !== "") {
                        updateEmail({ email: newEmail, navigation: navigation });
                      }
                    }}
                    marginTop={30}
                    text={I18nContext.getString("ok")}
                  />
                </View>
              </View>
            )}
          </Scene>
        </AuthContainer>
      </ImageBackground>
    );
  }
}

export default Profile;
