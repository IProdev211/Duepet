import React, { Component } from "react";
import { Image, View, SafeAreaView, StatusBar } from "react-native";
import { AppContainer, TitleView } from "styles/designSystem";
import PageTitle from "components/PageTitle";
import I18nContext from "translations/I18nContext";
import LabelInput from "components/LabelInput";
import Button from "components/SmallButton";
import TrackDescriptionForm from "components/TrackDescriptionForm";
import { NumberRegx } from "constants/constants";
import ErrorMessage from "components/ErrorMessage";
import { TRACKER_ITEMS } from "constants/constants";
import PresentLoader from "components/DpActivityIndicator";
import { NavigationEvents } from "react-navigation";
import {
  ScrollViewContainer,
  ImageContainer,
  PetImage,
  PetName,
  LogInfoContainer,
  KeyboardAvoidingViewContainer,
} from "./GoalOrientedLog.style";
import { CloseButton } from "pages/Setting/Support/Support.style";

interface IProps {
  petData: Array<object>;
  navigation: any;
  createTrackerLog: (object) => void;
  showLoader?: (value) => {};
}

interface IState {
  isValidate: boolean;
  errorMsg: string;
  log_amount: string;
  note: string;
  total_log: number;
}

class GoalOrientedLog extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isValidate: false,
      errorMsg: "",
      log_amount: "",
      total_log: 0,
      note: "",
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  setLogAmount = (value, property) => {
    this.setState({
      errorMsg: !NumberRegx.test(value)
        ? I18nContext.getString("required_only_number")
        : "",
    });
    this.setState({ log_amount: value });
  };

  onWillFocus = (payload) => {
    this.setState({
      isValidate: false,
      errorMsg: "",
      log_amount: "",
      total_log: 0,
      note: "",
    });
  };

  render() {
    const { log_amount, isValidate, errorMsg, note } = this.state;
    const { navigation, petData, createTrackerLog, showLoader } = this.props;
    const params = navigation.state.params || {};
    const pet: any = petData.find((p: any) => p.id === params.petId);
    return (
      <AppContainer>
        <NavigationEvents
          onWillFocus={(payload) => this.onWillFocus(payload)}
        />
        <KeyboardAvoidingViewContainer behavior="padding">
          <ScrollViewContainer contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView
              style={{
                marginTop: StatusBar.currentHeight,
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <TitleView>
                <PageTitle title={I18nContext.getString("duepet")} />
              </TitleView>
              <CloseButton
                onPress={() => {
                  this.props.navigation.navigate("Trackers");
                }}
              >
                <Image
                  source={require("../../../../assets/images/close/close.png")}
                />
              </CloseButton>
            </SafeAreaView>
            <ImageContainer>
              <PetImage source={{ uri: pet ? pet.avatar : "" }} />
              <PetName>{pet ? pet.name : ""}</PetName>
            </ImageContainer>
            <LogInfoContainer>
              <LabelInput
                value={this.state.log_amount}
                valueChange={this.setLogAmount}
                property={"log_amount"}
                keyboardType={"number-pad"}
                autoFocus={true}
                after={TRACKER_ITEMS[params.label].unit}
                label={I18nContext.getString("track_log_" + params.label)}
              />
              <View
                style={{
                  alignItems: "center",
                }}
              >
                {isValidate && log_amount === "" ? (
                  <ErrorMessage
                    text={I18nContext.getString("required_goal_amount")}
                  />
                ) : (
                  <ErrorMessage text={errorMsg} />
                )}
              </View>
            </LogInfoContainer>
            <TrackDescriptionForm
              text={this.state.note}
              setNote={(text) => this.setState({ note: text })}
            />
            <Button
              text={I18nContext.getString("save")}
              onPress={() => {
                this.setState({ isValidate: true });
                let isValidate = !(
                  !NumberRegx.test(log_amount) || log_amount === ""
                );
                if (isValidate) {
                  createTrackerLog({
                    tracker_id: params.trackerId,
                    value: log_amount,
                    note: note,
                    navigation: navigation,
                    showLoader: showLoader,
                  });
                }
              }}
            />
          </ScrollViewContainer>
        </KeyboardAvoidingViewContainer>
        <PresentLoader />
      </AppContainer>
    );
  }
}

export default GoalOrientedLog;
