import React, { Component } from "react";
import { AppContainer, ScrollContainer, DialogText } from "styles/designSystem";
import TrackItem from "components/TrackerItem";
import { TrackersContainer } from "./AddTracker.style";
import { FlatList, View, Platform, Alert } from "react-native";
import { TRACKER_ITEMS } from "constants/constants";
import styled from "styled-components";
import PetImagesScrollView from "components/PetImagesScrollView";
import { RespScreenHeight } from "styles/sizes";

const PetImageSlider = styled(View)`
  margin-top: ${RespScreenHeight(2)};
  margin-bottom: ${RespScreenHeight(2)};
`;

const FlatListContainer = styled.View`
  margin-bottom: ${RespScreenHeight(15)};
`;

class AddTracker extends Component<
  {
    navigation: any;
    petData: any;
    setDialog: (value: boolean) => {};
    setDialogTitle: (value: string) => {};
    setDialogContain: (value: any) => {};
    setDialogFooter: (value: boolean) => {};
  },
  { petIndex: number }
> {
  constructor(props) {
    super(props);

    this.state = {
      petIndex: 0
    };
  }

  handleSelectImage = index => {
    if (index) this.setState({ petIndex: index });
  };

  render() {
    const { petIndex } = this.state;
    const { navigation } = this.props;
    return (
      <AppContainer>
        <FlatListContainer>
          <FlatList
            ListHeaderComponent={
              <PetImageSlider>
                <PetImagesScrollView
                  defaultSelect={this.state.petIndex}
                  multiple={false}
                  allOption={true}
                  handleSelectImage={this.handleSelectImage}
                />
              </PetImageSlider>
            }
            data={Object.values(TRACKER_ITEMS)}
            renderItem={({ item, index }) => (
              <TrackersContainer key={index}>
                <TrackItem
                  item={item}
                  onPress={() => {
                    if (index < 4) {
                      let isTrackerAvailable = false;
                      if (item.name === "food") {
                        if (
                          this.props.petData[petIndex] &&
                          this.props.petData[petIndex].foodConsumption !== null
                        ) {
                          isTrackerAvailable = true;
                        }
                      }
                      if (item.name === "weight") {
                        if (
                          this.props.petData[petIndex] &&
                          this.props.petData[petIndex].lastRecordedWeight !==
                            null
                        ) {
                          isTrackerAvailable = true;
                        }
                      }
                      if (item.name === "water") {
                        if (
                          this.props.petData[petIndex] &&
                          this.props.petData[petIndex].waterConsumption !== null
                        ) {
                          isTrackerAvailable = true;
                        }
                      }
                      if (item.name === "exercise") {
                        if (
                          this.props.petData[petIndex] &&
                          this.props.petData[petIndex].exercise !== null
                        ) {
                          isTrackerAvailable = true;
                        }
                      }
                      if (isTrackerAvailable) {
                        if (Platform.OS === "ios") {
                          this.props.setDialogTitle("opps!");
                          this.props.setDialogFooter(true);
                          this.props.setDialogContain(
                            <DialogText>
                              {"Tracker is already available for " + item.name}
                            </DialogText>
                          );
                          this.props.setDialog(true);
                        } else {
                          Alert.alert(
                            "opps!",
                            "Tracker is already available for " + item.name
                          );
                        }
                      } else {
                        navigation.navigate("AddNotGoalTracker", {
                          label: item.name,
                          petIndex,
                          type: "Goal"
                        });
                      }
                    } else {
                      let isTrackerAvailable = false;
                      if (item.name === "poo") {
                        if (
                          this.props.petData[petIndex] &&
                          this.props.petData[petIndex].pooCount !== null
                        ) {
                          isTrackerAvailable = true;
                        }
                      }
                      if (item.name === "wee") {
                        if (
                          this.props.petData[petIndex] &&
                          this.props.petData[petIndex].weeCount !== null
                        ) {
                          isTrackerAvailable = true;
                        }
                      }
                      if (item.name === "vomit") {
                        if (
                          this.props.petData[petIndex] &&
                          this.props.petData[petIndex].vomitCount !== null
                        ) {
                          isTrackerAvailable = true;
                        }
                      }
                      if (isTrackerAvailable) {
                        if (Platform.OS === "ios") {
                          this.props.setDialogTitle("opps!");
                          this.props.setDialogFooter(true);
                          this.props.setDialogContain(
                            <DialogText>
                              {"Tracker is already available for " + item.name}
                            </DialogText>
                          );
                          this.props.setDialog(true);
                        } else {
                          Alert.alert(
                            "opps!",
                            "Tracker is already available for " + item.name
                          );
                        }
                      } else {
                        navigation.navigate("AddNotGoalTracker", {
                          label: item.name,
                          petIndex
                        });
                      }
                    }
                  }}
                />
              </TrackersContainer>
            )}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        </FlatListContainer>
      </AppContainer>
    );
  }
}

export default AddTracker;
