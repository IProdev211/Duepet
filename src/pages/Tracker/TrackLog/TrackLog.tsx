import React, { Component } from "react";
import { SafeAreaView, StatusBar, Image, View, Alert } from "react-native";
import { AppContainer } from "styles/designSystem";
import PageTitle from "components/PageTitle";
import I18nContext from "translations/I18nContext";
import TrackDescriptionForm from "components/TrackDescriptionForm";
import TrackRating from "components/TrackRating";
import PresentLoader from "components/DpActivityIndicator";
import Button from "components/SmallButton";
import { NavigationEvents } from "react-navigation";
import {
  ScrollViewContainer,
  ImageContainer,
  PetImage,
  PetName,
  KeyboardAvoidingViewContainer,
  CloseButton,
  ButtonContainer,
  ScaleView,
} from "./TrackLog.style";
import TrackerRatingScale from "components/TrackerRatingScale";

interface IProps {
  petData: Array<any>;
  navigation: any;
  createTrackerLog: (object) => void;
  showLoader?: (value) => {};
}

interface IState {
  isChanged: boolean;
  isValidate: boolean;
  errorMsg: string;
  rating: number;
  note: string;
}

class TrackLog extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isChanged: false,
      isValidate: false,
      errorMsg: "",
      rating: 1,
      note: "",
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  onWillFocus = (payload) => {
    this.setState({
      isChanged: false,
      isValidate: false,
      errorMsg: "",
      rating: 1,
      note: "",
    });
  };

  render() {
    const { rating, isValidate, errorMsg, note } = this.state;
    const { navigation, petData, createTrackerLog, showLoader } = this.props;
    const params = navigation.state.params || {};
    const last_value = params.last ? params.last.value : "0";
    const pet = petData.find((p) => p.id === params.petId);
    return (
      <AppContainer>
        <NavigationEvents
          onWillFocus={(payload) => this.onWillFocus(payload)}
        />
        <SafeAreaView
          style={{
            marginTop: StatusBar.currentHeight,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <PageTitle title={I18nContext.getString("duepet")} />
          </View>
          <CloseButton
            onPress={() => {
              if (this.state.isChanged) {
                Alert.alert(
                  "You're still editing!",
                  "Are you sure you want to go to other screen?",
                  [
                    {
                      text: "cancel",
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => {
                        this.props.navigation.goBack();
                      },
                    },
                  ],
                  {
                    cancelable: false,
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
        <KeyboardAvoidingViewContainer behavior="padding">
          <ScrollViewContainer contentContainerStyle={{ flexGrow: 1 }}>
            <ImageContainer>
              <PetImage source={{ uri: pet.avatar }} />
              <PetName>{pet.name}</PetName>
            </ImageContainer>
            <TrackDescriptionForm
              setNote={(text) => this.setState({ note: text, isChanged: true })}
            />
            <ScaleView>
              <TrackerRatingScale />
            </ScaleView>
            <TrackRating
              onChangeRating={(index) =>
                this.setState({ rating: index, isChanged: true })
              }
            />
            <ButtonContainer>
              <Button
                text={I18nContext.getString("save")}
                onPress={() => {
                  createTrackerLog({
                    tracker_id: params.trackerId,
                    value: "0",
                    rating: rating,
                    note: note,
                    navigation: navigation,
                    showLoader: showLoader,
                  });
                }}
              />
            </ButtonContainer>
          </ScrollViewContainer>
        </KeyboardAvoidingViewContainer>
        <PresentLoader />
      </AppContainer>
    );
  }
}

export default TrackLog;
