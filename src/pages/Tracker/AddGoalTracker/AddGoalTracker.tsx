import React, { Component } from "react";
import { Image, View, SafeAreaView, StatusBar } from "react-native";
import { AppContainer, TitleView, CloseButton } from "styles/designSystem";
import PageTitle from "components/PageTitle";
import I18nContext from "translations/I18nContext";
import LabelInput from "components/LabelInput";
import Button from "components/SmallButton";
import { NumberRegx } from "constants/constants";
import ErrorMessage from "components/ErrorMessage";
import { TRACKER_ITEMS } from "constants/constants";
import {
  ImageContainer,
  PetImage,
  PetName,
  LogInfoContainer,
  ButtonContainer,
} from "./AddGoalTracker.style";
import PresentLoader from "components/DpActivityIndicator";

interface IState {
  isValidate: boolean;
  errorMsg: string;
  goal_amount: string;
}

interface IProps {
  navigation: any;
  petData: Array<any>;
  showLoader: (value) => {};
  addTracker: (object) => void;
}

class AddGoalTracker extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isValidate: false,
      errorMsg: "",
      goal_amount: "",
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
    this.setState({ goal_amount: value });
  };

  render() {
    const { isValidate, goal_amount, errorMsg } = this.state;
    const { navigation, petData, addTracker, showLoader } = this.props;
    const params = navigation.state.params || {};
    return (
      <AppContainer>
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
              this.props.navigation.goBack();
            }}
          >
            <Image
              source={require("../../../../assets/images/close/close.png")}
            />
          </CloseButton>
        </SafeAreaView>
        <ImageContainer>
          <PetImage source={{ uri: petData[params.petIndex].avatar }} />
          <PetName>{petData[params.petIndex].name}</PetName>
        </ImageContainer>
        <LogInfoContainer label={params.label}>
          <LabelInput
            valueChange={this.setGoalAmount}
            property={"goal_per_day"}
            after={
              " " +
              I18nContext.getString(
                "track_" + TRACKER_ITEMS[params.label].unit + "_per_day"
              )
            }
            label={I18nContext.getString("goal") + "   "}
            keyboardType={"number-pad"}
            autoFocus={true}
          />
          <View
            style={{
              alignItems: "center",
            }}
          >
            {isValidate && goal_amount === "" ? (
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
              let isValidate = !(
                !NumberRegx.test(goal_amount) || goal_amount === ""
              );
              if (isValidate) {
                addTracker({
                  pet_id: petData[params.petIndex].id,
                  note: "",
                  goal_value: goal_amount,
                  label: params.label,
                  navigation,
                  showLoader: this.props.showLoader,
                });
              }
            }}
          />
        </ButtonContainer>
        <PresentLoader />
      </AppContainer>
    );
  }
}

export default AddGoalTracker;
