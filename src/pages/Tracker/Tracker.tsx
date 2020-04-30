import React, { Component } from "react";
import { NavigationScreenProp } from "react-navigation";
import {
  Alert,
  BackHandler,
  StatusBar,
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import I18nContext from "../../translations/I18nContext";
import PageTitle from "components/PageTitle";
import { AppContainer } from "styles/designSystem";
import SwipeComponent from "components/TrackerSwipeComponent";
import PetImagesScrollView from "components/PetImagesScrollView";
import _ from "lodash";
import {
  ScrollViewContainer,
  PetsCarouselWrapper,
  DashboardHeadingContainer,
  DashboardHeadingText,
  TrackerItemsContainer,
  TrackerWarning,
  TrackerWarningText,
  HeaderItemLabelText,
  HeaderItemLatestText,
  HeaderItemGoalText,
  DashboardItemsView,
} from "./Tracker.style";
import PresentLoader from "components/DpActivityIndicator";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  currentPetTracker: Array<object>;
  petData: Array<any>;
  trackerData: Array<any>;
  trackerLoading: boolean;
  deleteTracker: (object) => void;
  showLoader: (value) => {};
  activeTrackerCount: number;
}

interface IState {
  petId: number;
  trackerDataOfPet: Array<object>;
  selectedPet: number;
}

class Tracker extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      petId: 0,
      selectedPet: 0,
      trackerDataOfPet: [],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    const petData = this.props.petData || [];
    const activePetData =
      petData.length !== 0
        ? petData.filter((pet) => pet.petActiveTrackersCount !== 0)
        : [];
    this.setState({
      petId: activePetData.length != 0 ? activePetData[0].id : 0,
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = () => {
    return true;
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { trackerData, petData } = this.props;

    if (
      JSON.stringify(trackerData) !== JSON.stringify(prevProps.trackerData) ||
      JSON.stringify(petData) !== JSON.stringify(prevProps.petData)
    ) {
      return 1;
    }

    return -1;
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (snapShot !== -1) {
      const petData = this.props.petData || [];
      const activePetData =
        petData.length !== 0
          ? petData.filter((pet) => pet.petActiveTrackersCount !== 0)
          : [];

      if (this.state.selectedPet >= activePetData.length) {
        this.setState({
          petId:
            activePetData.length != 0
              ? activePetData[activePetData.length - 1].id
              : 0,
          selectedPet: activePetData.length - 1,
        });
      }
    }
    return null;
  }

  handleSelectImage = (selectedPet) => {
    const petData = this.props.petData || [];
    this.setState({
      petId: petData.filter((pet) => pet.petActiveTrackersCount !== 0)[
        selectedPet
      ].id,
      selectedPet,
    });
  };
  render() {
    const { petId } = this.state;
    const {
      navigation,
      trackerData,
      deleteTracker,
      activeTrackerCount,
    } = this.props;

    const trackerDataOfPet = _.filter(
      trackerData,
      (tracker: any) => tracker.pet.id == petId
    );
    return (
      <AppContainer>
        <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
          <PageTitle
            title={I18nContext.getString("duepet")}
            backAction={navigation.goBack}
            backTitle="Trackers"
            titleSubContent={
              activeTrackerCount < 10
                ? "0" + activeTrackerCount + " Active trackers"
                : "" + activeTrackerCount + " Active trackers"
            }
          />
        </SafeAreaView>
        {activeTrackerCount === 0 && (
          <TrackerWarning>
            <TrackerWarningText>
              {I18nContext.getString("no_tracker_warn")}
            </TrackerWarningText>
          </TrackerWarning>
        )}
        {activeTrackerCount !== 0 && (
          <ScrollViewContainer>
            <PetsCarouselWrapper>
              <PetImagesScrollView
                defaultSelect={this.state.selectedPet}
                handleSelectImage={this.handleSelectImage}
                allOption={true}
                tracker={true}
              />
            </PetsCarouselWrapper>
            <DashboardHeadingContainer>
              <DashboardHeadingText>
                {I18nContext.getString("you_are_tracking")}
              </DashboardHeadingText>
              <DashboardItemsView>
                <HeaderItemLabelText>
                  {I18nContext.getString("tracker")}
                </HeaderItemLabelText>
                <HeaderItemLatestText>
                  {I18nContext.getString("today")}
                </HeaderItemLatestText>
                <HeaderItemGoalText>
                  {I18nContext.getString("goal")}
                </HeaderItemGoalText>
              </DashboardItemsView>
            </DashboardHeadingContainer>
            {trackerData && (
              <TrackerItemsContainer>
                {trackerDataOfPet.map((data: any) => {
                  if (data.label === "weight") {
                    if (data.values && data.values.length > 0) {
                      data.last_total.value =
                        data.values[data.values.length - 1].value;
                    }
                  }
                  return (
                    <SwipeComponent
                      currentPetId={petId}
                      navigation={navigation}
                      key={data.id}
                      goal_oriented={data.goal_oriented}
                      label={data.label}
                      goal={data.goal_value}
                      last={data.last_total}
                      previous={data.previous_total}
                      data={data.values}
                      trackerId={data.id}
                      onhandleEdit={() => {
                        navigation.navigate("GoalOrientedLogEdit", {
                          trackerId: data.id,
                          petId: petId,
                          petIndex: petId,
                          label: data.label,
                          goal_value: data.goal_value,
                          last: data.last_total,
                          previous: data.previous_total,
                        });
                      }}
                      onhandleDone={() => {
                        const params: any = {
                          goalOriented: data.goal_oriented,
                          trackerData: data,
                          goal: data.goal_value,
                          label: data.label,
                          trackerId: data.id,
                          last: data.last_total,
                          previous: data.previous_total,
                        };
                        if (
                          data.label === "poo" ||
                          data.label === "wee" ||
                          data.label === "vomit"
                        ) {
                          params.type = "non_goal";
                        } else {
                          params.values = data.values;
                          params.type = "goal";
                        }
                        navigation.navigate("TrackerChart", params);
                      }}
                      onhandleRemove={() => {
                        Alert.alert(
                          "Delete",
                          "Are you sure you want to delete this tracker?",
                          [
                            {
                              text: "cancel",
                              style: "cancel",
                            },
                            {
                              text: "OK",
                              onPress: () => {
                                deleteTracker({
                                  label: data.label,
                                  trackerId: data.id,
                                  petId: petId,
                                  navigation: this.props.navigation,
                                  showLoader: this.props.showLoader,
                                });
                              },
                            },
                          ],
                          {
                            cancelable: false,
                          }
                        );
                      }}
                    />
                  );
                })}
              </TrackerItemsContainer>
            )}
          </ScrollViewContainer>
        )}
        <PresentLoader />
      </AppContainer>
    );
  }
}

export default Tracker;
