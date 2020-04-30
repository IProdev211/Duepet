import React, { Component } from "react";
import { AppContainer, TitleView } from "styles/designSystem";
import {
  ScrollContainer,
  KeyboardAvoidingViewContainer,
  CloseButton,
  SubmitButtonView
} from "./Support.style";
import Button from "components/SmallButton";
import I18nContext from "translations/I18nContext";
import UploadImage from "components/ScreenShotImage";
import TrackDescriptionForm from "components/TrackDescriptionForm";
import { Alert, Image, SafeAreaView, StatusBar } from "react-native";
import PageTitle from "components/PageTitle";

class Support extends Component<
  { theme?: object; uploadScreenshot: any; navigation: any },
  { description: string; screenShotImage: any; isChanged: boolean }
> {
  static navigationOptions = {
    title: I18nContext.getString("support"),
    headerShown: false
  };

  static getDerivedStateFromProps(props, state) {
    const params = props.navigation.state.params || {};
    if (params.image) {
      if (params.image.uri !== state.screenShotImage.uri) {
        return {
          screenShotImage: { ...params.image }
        };
      }
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      description: "",
      screenShotImage: { uri: "" },
      isChanged: false
    };
  }

  handleSubmit = () => {
    const { uploadScreenshot, navigation } = this.props;
    const { description, screenShotImage } = this.state;

    if (description === "" && screenShotImage.uri === "") {
      Alert.alert("", "Please enter some information.", [{ text: "Okay" }]);
    } else {
      uploadScreenshot({
        image: {},
        description: description,
        navigation: navigation
      });
    }
  };

  render() {
    const { screenShotImage } = this.state;
    return (
      <AppContainer>
        <SafeAreaView
          style={{
            marginTop: StatusBar.currentHeight,
            justifyContent: "center",
            flexDirection: "row"
          }}
        >
          <TitleView>
            <PageTitle title={I18nContext.getString("duepet")} />
          </TitleView>
          <CloseButton
            onPress={() => {
              if (this.state.isChanged) {
                Alert.alert(
                  "You're still editing!",
                  "Are you sure you want to go to other screen?",
                  [
                    {
                      text: "cancel",
                      style: "cancel"
                    },
                    {
                      text: "OK",
                      onPress: () => {
                        this.props.navigation.goBack();
                      }
                    }
                  ],
                  {
                    cancelable: false
                  }
                );
              } else {
                this.props.navigation.goBack();
              }
            }}
          >
            <Image
              source={require("../../../../assets/images/close/close.png")}
            />
          </CloseButton>
        </SafeAreaView>
        <KeyboardAvoidingViewContainer
          behavior="padding"
          keyboardVerticalOffset={-100}
        >
          <ScrollContainer contentContainerStyle={{ flexGrow: 1 }}>
            <TrackDescriptionForm
              setNote={text =>
                this.setState({ description: text, isChanged: true })
              }
            />
            <UploadImage
              image={{ uri: screenShotImage.uri }}
              navigation={this.props.navigation}
            />
          </ScrollContainer>
          <SubmitButtonView>
            <Button
              text={I18nContext.getString("submit")}
              onPress={this.handleSubmit}
            />
          </SubmitButtonView>
        </KeyboardAvoidingViewContainer>
      </AppContainer>
    );
  }
}

export default Support;
