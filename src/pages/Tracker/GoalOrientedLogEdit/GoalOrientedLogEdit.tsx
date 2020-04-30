import React, { Component } from "react";
import { View, SafeAreaView, StatusBar, Image } from "react-native";
import { AppContainer, TitleView } from "styles/designSystem";
import PageTitle from "components/PageTitle";
import I18nContext from "translations/I18nContext";
import PetTrackInfo from "components/PetTrackerInfo";
import ProgressChart from "components/ProgressChart";
import Button from "components/SmallButton";
import LabelInput from "components/LabelInput";
import { NumberRegx } from "constants/constants";
import ErrorMessage from "components/ErrorMessage";
import DropdownSelect from "components/CustomDropdownSelect";
import { TRACKER_ITEMS } from "constants/constants";
import moment from "moment";
import {
  ScrollViewContainer,
  ImageContainer,
  PetImage,
  PetName,
  LogInfoContainer,
  ButtonContainer,
  KeyboardAvoidingViewContainer,
} from "./GoalOrientedLogEdit.style";
import { CloseButton } from "pages/Setting/Support/Support.style";

interface IProps {
  navigation: any;
  petData: Array<any>;
  updateTracker: (object) => void;
}

interface IState {
  isValidate: boolean;
  errorMsg: string;
  goal_value: string;
  pet: object;
}

class GoalOrientedLogEdit extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    const params = props.navigation.state.params || {};
    this.state = {
      isValidate: false,
      errorMsg: "",
      goal_value: params.goal_value,
      pet: {},
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  setGoalAmount = (value, property) => {
    this.setState({
      errorMsg: !NumberRegx.test(value)
        ? I18nContext.getString("required_only_number")
        : "",
    });
    this.setState({ goal_value: value });
  };

  render() {
    const { isValidate, goal_value, errorMsg } = this.state;
    const { navigation, petData, updateTracker } = this.props;
    const params = navigation.state.params || {};
    const pet = petData.find((p) => p.id === params.petId);
    return (
      <AppContainer>
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
              <PetImage source={{ uri: pet.avatar }} />
              <PetName>{pet.name}</PetName>
            </ImageContainer>
            <LogInfoContainer>
              <LabelInput
                autoFocus={true}
                value={this.state.goal_value}
                valueChange={this.setGoalAmount}
                keyboardType={"number-pad"}
                property={"goal_per_day"}
                after={
                  " " +
                  I18nContext.getString(
                    "track_" + TRACKER_ITEMS[params.label].unit + "_per_day"
                  )
                }
                label={I18nContext.getString("goal") + "   "}
              />
              <View
                style={{
                  alignItems: "center",
                }}
              >
                {isValidate && goal_value === "" ? (
                  <ErrorMessage
                    text={I18nContext.getString("required_goal_amount")}
                  />
                ) : (
                  <ErrorMessage text={errorMsg} />
                )}
              </View>
            </LogInfoContainer>
            <ButtonContainer>
              <Button
                text={I18nContext.getString("save")}
                onPress={() => {
                  this.setState({ isValidate: true });
                  if (this.state.goal_value !== "") {
                    updateTracker({
                      goal_value: this.state.goal_value,
                      trackerId: params.trackerId,
                      navigation: this.props.navigation,
                    });
                  }
                }}
              />
            </ButtonContainer>
          </ScrollViewContainer>
        </KeyboardAvoidingViewContainer>
      </AppContainer>
    );
  }
}

export default GoalOrientedLogEdit;
