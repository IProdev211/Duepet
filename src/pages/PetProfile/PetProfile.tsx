import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";

import { AppContainer } from "styles/designSystem";
import I18nContext from "translations/I18nContext";

import CustomInput from "components/CustomInput";
import { Edit as EditIcon } from "components/Icons/Edit";
import { Visibility } from "components/Icons/Visibility";
import GenderSelector from "components/GenderSelector";
import PetImagesScrollView from "components/PetImagesScrollView";
import _ from "lodash";
import Button from "components/SmallButton";
import alertService from "service/alertService";
import { TRACKER_ITEMS } from "constants/constants";

import {
  Container,
  EditIconContainer,
  ScrollContainer,
  PetImageSlider,
  PetWarningText,
  PetWarning,
} from "./PetProfile.style";
import { NavigationEvents } from "react-navigation";
import { setLoader, deletePet } from "../../redux/actions";

interface IProps {
  navigation: any;
  getPetByUser: any;
  petData: Array<any>;
  petTypes: Array<any>;
  trackerData: Array<any>;
  petLoading: boolean;
  deletePet: (value, loader) => {};
  showLoader: (value) => {};
}

class PetProfile extends Component<
  IProps,
  { petList: Array<any>; selectedPet: number }
> {
  constructor(props) {
    super(props);
    this.state = {
      petList: [],
      selectedPet: 0,
    };
  }

  componentDidMount() {
    this.setPetList();
  }

  setPetList = () => {
    this.setState({
      petList: _.filter(this.props.petData, (pet) => pet.name !== "all"),
    });
  };

  handleSave = () => {
    alertService
      .confirmAlert(
        "Confirm",
        "Are you sure? All information will be hidden permanently and can not be restored, do you wish to continue?"
      )
      .then((resp) => {
        if (resp) {
          this.props.deletePet(
            this.props.petData[this.state.selectedPet],
            this.props.showLoader
          );
        }
      });
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    let currentPetList = _.filter(
      this.props.petData,
      (pet) => pet.name !== "all"
    );
    if (JSON.stringify(prevState.petList) !== JSON.stringify(currentPetList)) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (snapShot) {
      this.setState({
        petList: _.filter(this.props.petData, (pet) => pet.name !== "all"),
      });
    }
  }

  handleSelectImage = (index) => {
    if (index != null) this.setState({ selectedPet: index });
  };

  render() {
    const { selectedPet } = this.state;
    const { petTypes, navigation } = this.props;
    const _data = this.props.petData;
    return (
      <AppContainer>
        <NavigationEvents onWillFocus={(payload) => this.setPetList()} />
        {this.props.petData.length == 0 && (
          <PetWarning
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <PetWarningText>
              {I18nContext.getString("no_pet_warn")}
            </PetWarningText>
          </PetWarning>
        )}
        {this.props.petData.length > 0 && (
          <Container>
            <ScrollContainer>
              <PetImageSlider>
                <PetImagesScrollView
                  multiple={false}
                  allOption={true}
                  defaultSelect={this.state.selectedPet}
                  petData={this.props.petData}
                  handleSelectImage={this.handleSelectImage}
                />
              </PetImageSlider>
              <View>
                <CustomInput
                  value={_data[selectedPet] ? _data[selectedPet].name : null}
                  label={I18nContext.getString("pet_profile_name")}
                  editable={false}
                  textAlignRight={true}
                ></CustomInput>
                <EditIconContainer>
                  <EditIcon
                    onPress={() => {
                      const { user, updated, created, ...data } = _data[
                        selectedPet
                      ];
                      this.props.navigation.navigate("AddPetProfile", {
                        petData: data,
                        editMode: true,
                      });
                    }}
                  />
                </EditIconContainer>
              </View>

              <GenderSelector
                label={I18nContext.getString("gender")}
                maleSelect={
                  _data[selectedPet] ? _data[selectedPet].gender : "-1"
                }
                editable={false}
              />
              <CustomInput
                value={
                  _data[selectedPet] && petTypes
                    ? _data[selectedPet].type.name
                    : null
                }
                label={I18nContext.getString("type")}
                editable={false}
                textAlignRight={true}
              />
              <CustomInput
                value={
                  _data[selectedPet] ? _data[selectedPet].age.toString() : null
                }
                label={I18nContext.getString("age")}
                editable={false}
                textAlignRight={true}
              />
              <CustomInput
                value={
                  _data[selectedPet]
                    ? _data[selectedPet].microchip_number
                    : null
                }
                label={I18nContext.getString("chip_number")}
                editable={false}
                textAlignRight={true}
              />
              {_data[selectedPet] && (
                <View>
                  {_data[selectedPet].lastRecordedWeight !== null && (
                    <CustomInput
                      label={I18nContext.getString("pet_last_record_weight")}
                      value={
                        _data[selectedPet].lastRecordedWeight +
                        " " +
                        TRACKER_ITEMS["weight"].unit
                      }
                      afterIcon={
                        <Visibility
                          onPress={() => {
                            const trackerData = this.props.trackerData;
                            const data = trackerData.find(
                              (tracker) =>
                                tracker.pet.id === _data[selectedPet].id &&
                                tracker.label === "weight"
                            );
                            navigation.navigate("TrackerChart", {
                              goalOriented: true,
                              trackerData: data,
                              goal: data.goal_value,
                              label: "weight",
                              trackerId: data.id,
                            });
                          }}
                        />
                      }
                      editable={false}
                    />
                  )}
                  {_data[selectedPet].foodConsumption !== null && (
                    <CustomInput
                      label={I18nContext.getString("pet_food_consummation")}
                      value={
                        _data[selectedPet].foodConsumption +
                        " " +
                        TRACKER_ITEMS["food"].unit
                      }
                      afterIcon={
                        <Visibility
                          onPress={() => {
                            const trackerData = this.props.trackerData;
                            const data = trackerData.find(
                              (tracker) =>
                                tracker.pet.id === _data[selectedPet].id &&
                                tracker.label === "food"
                            );
                            navigation.navigate("TrackerChart", {
                              goalOriented: true,
                              trackerData: data,
                              goal: data.goal_value,
                              label: "food",
                              trackerId: data.id,
                            });
                          }}
                        />
                      }
                      editable={false}
                    />
                  )}
                  {_data[selectedPet].exercise !== null && (
                    <CustomInput
                      label={I18nContext.getString("pet_exercise")}
                      value={
                        _data[selectedPet].exercise +
                        " " +
                        TRACKER_ITEMS["exercise"].unit
                      }
                      afterIcon={
                        <Visibility
                          onPress={() => {
                            const trackerData = this.props.trackerData;
                            const data = trackerData.find(
                              (tracker) =>
                                tracker.pet.id === _data[selectedPet].id &&
                                tracker.label === "exercise"
                            );
                            navigation.navigate("TrackerChart", {
                              goalOriented: true,
                              trackerData: data,
                              goal: data.goal_value,
                              label: "exercise",
                              trackerId: data.id,
                            });
                          }}
                        />
                      }
                      editable={false}
                    />
                  )}
                  {_data[selectedPet].waterConsumption !== null && (
                    <CustomInput
                      label={I18nContext.getString("pet_water_consummation")}
                      value={
                        _data[selectedPet].waterConsumption +
                        " " +
                        TRACKER_ITEMS["water"].unit
                      }
                      afterIcon={
                        <Visibility
                          onPress={() => {
                            const trackerData = this.props.trackerData;
                            const data = trackerData.find(
                              (tracker) =>
                                tracker.pet.id === _data[selectedPet].id &&
                                tracker.label === "water"
                            );
                            navigation.navigate("TrackerChart", {
                              goalOriented: true,
                              trackerData: data,
                              goal: data.goal_value,
                              label: "water",
                              trackerId: data.id,
                            });
                          }}
                        />
                      }
                      editable={false}
                    />
                  )}
                  {_data[selectedPet].pooCount !== null && (
                    <CustomInput
                      label={I18nContext.getString("pet_poo")}
                      value={
                        _data[selectedPet].pooCount +
                        " " +
                        TRACKER_ITEMS["poo"].unit
                      }
                      afterIcon={
                        <Visibility
                          onPress={() => {
                            const trackerData = this.props.trackerData;
                            const data = trackerData.find(
                              (tracker) =>
                                tracker.pet.id === _data[selectedPet].id &&
                                tracker.label === "poo"
                            );
                            navigation.navigate("TrackerChart", {
                              goalOriented: false,
                              trackerData: data,
                              goal: data.goal_value,
                              label: "poo",
                              trackerId: data.id,
                              last: data.last_total
                            });
                          }}
                        />
                      }
                      editable={false}
                    />
                  )}
                  {_data[selectedPet].weeCount !== null && (
                    <CustomInput
                      label={I18nContext.getString("pet_wee")}
                      value={
                        _data[selectedPet].weeCount +
                        " " +
                        TRACKER_ITEMS["wee"].unit
                      }
                      afterIcon={
                        <Visibility
                          onPress={() => {
                            const trackerData = this.props.trackerData;
                            const data = trackerData.find(
                              (tracker) =>
                                tracker.pet.id === _data[selectedPet].id &&
                                tracker.label === "wee"
                            );
                            navigation.navigate("TrackerChart", {
                              goalOriented: false,
                              trackerData: data,
                              goal: data.goal_value,
                              label: "wee",
                              trackerId: data.id,
                              last: data.last_total
                            });
                          }}
                        />
                      }
                      editable={false}
                    />
                  )}
                  {_data[selectedPet].vomitCount !== null && (
                    <CustomInput
                      label={I18nContext.getString("pet_vomit")}
                      value={
                        _data[selectedPet].vomitCount +
                        " " +
                        TRACKER_ITEMS["vomit"].unit
                      }
                      afterIcon={
                        <Visibility
                          onPress={() => {
                            const trackerData = this.props.trackerData;
                            const data = trackerData.find(
                              (tracker) =>
                                tracker.pet.id === _data[selectedPet].id &&
                                tracker.label === "vomit"
                            );
                            navigation.navigate("TrackerChart", {
                              goalOriented: false,
                              trackerData: data,
                              goal: data.goal_value,
                              label: "vomit",
                              trackerId: data.id,
                              last: data.last_total
                            });
                          }}
                        />
                      }
                      editable={false}
                    />
                  )}
                  {_data[selectedPet].reminderOverdueCount !== 0 && (
                    <CustomInput
                      label={I18nContext.getString("overdue")}
                      value={
                        _data[selectedPet].reminderOverdueCount +
                        " " +
                        I18nContext.getString("view")
                      }
                      afterIcon={
                        <Visibility
                          onPress={() => {
                            navigation.navigate("Schedule", {
                              tab: "overdue",
                              selectedId: this.props.petData[
                                this.state.selectedPet
                              ].id,
                            });
                          }}
                        />
                      }
                      editable={false}
                    />
                  )}
                  {_data[selectedPet].reminderUpcomingCount !== 0 && (
                    <CustomInput
                      label={I18nContext.getString("upcoming")}
                      value={
                        _data[selectedPet].reminderUpcomingCount +
                        " " +
                        I18nContext.getString("view")
                      }
                      afterIcon={
                        <Visibility
                          onPress={() => {
                            navigation.navigate("Schedule", {
                              tab: "upcoming",
                              selectedId: this.props.petData[
                                this.state.selectedPet
                              ].id,
                            });
                          }}
                        />
                      }
                      editable={false}
                    />
                  )}
                  {_data[selectedPet].reminderDoneCount !== 0 && (
                    <CustomInput
                      label={I18nContext.getString("done")}
                      value={
                        _data[selectedPet].reminderDoneCount +
                        " " +
                        I18nContext.getString("view")
                      }
                      afterIcon={
                        <Visibility
                          onPress={() => {
                            navigation.navigate("Schedule", {
                              tab: "done",
                              selectedId: this.props.petData[
                                this.state.selectedPet
                              ].id,
                            });
                          }}
                        />
                      }
                      editable={false}
                    />
                  )}
                </View>
              )}
              <Button
                bgColor={true}
                hidePet={true}
                text={I18nContext.getString("hide_pet_profile")}
                onPress={() => this.handleSave()}
              />
            </ScrollContainer>
          </Container>
        )}
      </AppContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    petLoading: state.petReducer.petLoading,
    petData: state.petReducer.petData,
    petTypes: state.petReducer.petTypes,
    trackerData: state.trackerReducer.trackerData,
  };
};

const mapDispatchToProps = (dispatch, ownprops) => {
  return {
    showLoader: (value) => dispatch(setLoader(value)),
    deletePet: (data, loader) => dispatch(deletePet(data, loader)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PetProfile);
