import React from "react";
import { IProps } from "store/interface";
import { AppContainer, PetImageSlider } from "styles/designSystem";
import * as device from "expo-device";
import ReminderTabs from "components/ReminderTabs";
import sessionService from "service/sessionService";
import Reminders from "components/Reminders";
import moment from "moment";
import {
  setLoader,
  getReminderByPet,
  storePushToken,
  removeReminder,
  getReminderTemplate,
  updateReminderStatus,
} from "../../../redux/actions";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { RespScreenHeight } from "styles/sizes";
import ActionSheet from "react-native-actionsheet";
import { NavigationEvents } from "react-navigation";
import alertService from "../../../service/alertService";
import PetImagesScrollView from "components/PetImagesScrollView";
import _ from "lodash";

interface IState extends IProps {
  getReminderByPet: (filter, showloader) => {};
  removeReminder: (value, loader) => {};
  getReminderTemplate: (value, loader) => {};
  updateReminderStatus: (value, loader) => {};
  showLoader: (value) => {};
  storePushToken: (value) => {};
  petList: Array<any>;
  petData: Array<any>;
  selectedPet: number;
  defaultSelectedPet: number;
  reminderData: any;
  selectedItem: any;
}

const ScrollContainer = styled(ScrollView)`
  margin-top: ${RespScreenHeight(3)};
  margin-bottom: ${RespScreenHeight(15)};
`;

interface IPushToken {
  push_token: string;
  device_id: string;
}

class ReminderDashboard extends React.Component<IState> {
  state = {
    petList: [],
    selectedPet: 0,
    defaultSelectedPet: 0,
    selectedAll: null,
    selectedFilter: "upcoming",
    selectedItem: {},
    slice: 14,
  };
  ActionSheet;

  constructor(props) {
    super(props);
  }

  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.petData) != JSON.stringify(state.petList)) {
      return {
        petList: props.petData.slice(),
      };
    }
    return null;
  }

  removeParticularReminder = (value, index) => {
    const data = value;
    if (index === 0) {
      data.type = "single";
    }
    if (index === 1) {
      data.type = "all";
    }
    if (this.state.selectedAll && this.state.selectedAll.name === "all") {
      data.name = this.state.selectedAll.name;
    }
    data.id = this.props.petData[this.state.selectedPet].id;
    data.filter = this.state.selectedFilter;
    this.props.removeReminder(data, this.props.showLoader);
  };

  changeTabs = (value) => {
    this.setState({ selectedFilter: value }, () => {
      this.setState({ slice: 14 });
      this.loadReminder(value);
    });
  };

  componentDidMount() {
    const tokenInfo = {} as IPushToken;
    sessionService.getStorageData("pushToken").then((token) => {
      tokenInfo.push_token = token;
      tokenInfo.device_id = device.modelName;
      this.props.storePushToken(tokenInfo);
    });
  }

  loadInitialData = () => {
    const params = this.props.navigation.state.params || {};
    const petData = this.props.petData;
    const index = _.findIndex(petData, (pet) => pet.id === params.selectedId);
    if (params.tab && params.selectedId) {
      this.changeTabs(params.tab);
      this.setState({
        defaultSelectedPet: index + 1,
      });
    } else {
      this.setState({ defaultSelectedPet: 0 }, () => {
        this.handleSelectImage(0, {
          name: "all",
          avatar: "https://api.duepet.com/api/pets/avatars/default_avatar.jpg",
        });
      });
    }
  };

  loadReminder = (filter) => {
    if (this.state.selectedAll && this.state.selectedAll.name === "all") {
      const data = { ...this.state.selectedAll };
      data.filter = this.state.selectedFilter;
      this.props.getReminderByPet(data, this.props.showLoader);
    } else {
      const data: any = {};
      data.filter = filter;
      if (this.props.petData[this.state.selectedPet]) {
        data.id = this.props.petData[this.state.selectedPet].id;
      }
      this.props.getReminderByPet(data, this.props.showLoader);
    }
  };

  editReminderTemplate = (data) => {
    this.props.getReminderTemplate(data, this.props.showLoader);
    alertService
      .confirmAlert(
        "Confirm",
        "You have selected to edit the reminder from " +
          moment(new Date(data.item.value)).format("Do MMMM YYYY, h:mm a") +
          " your new reminder schedule will be created from " +
          moment(new Date()).format("Do MMMM YYYY, h:mm a") +
          " and remove all future values. Do you wish to edit?"
      )
      .then((resp) => {
        if (resp) {
          this.props.navigation.navigate("UpdateReminder", { editable: true });
        }
      });
  };

  changeReminderStatus = (value) => {
    if (this.state.selectedAll && this.state.selectedAll.name === "all") {
      value.name = this.state.selectedAll.name;
    }
    value.id = this.props.petData[this.state.selectedPet].id;
    value.filter = this.state.selectedFilter;
    this.props.updateReminderStatus(value, this.props.showLoader);
  };

  showActionSheet = (value) => {
    this.setState({ selectedItem: value });
    this.ActionSheet.show();
  };

  handleSelectImage = (index, item) => {
    this.setState({ slice: 14 });
    if (item.name === "all") {
      item.filter = this.state.selectedFilter;
      this.setState({ selectedAll: item }, () => {
        this.loadReminder(item);
      });
    } else {
      this.setState({ selectedAll: null }, () => {
        this.setState({ selectedPet: index - 1 }, () => {
          this.loadReminder(this.state.selectedFilter);
        });
      });
    }
  };

  loadMoreData = () => {
    this.setState({ slice: this.state.slice + 14 });
  };

  render() {
    const { petList } = this.props;
    return (
      <AppContainer>
        <NavigationEvents onWillFocus={(payload) => this.loadInitialData()} />
        <ScrollContainer onMomentumScrollEnd={this.loadMoreData}>
          <PetImageSlider>
            <PetImagesScrollView
              defaultSelect={this.state.defaultSelectedPet}
              source={petList}
              multiple={false}
              handleSelectImage={this.handleSelectImage}
            />
          </PetImageSlider>
          <ReminderTabs
            selectedTabs={this.state.selectedFilter}
            changeTabs={this.changeTabs}
          />
          <Reminders
            slice={this.state.slice}
            daneReminder={this.changeReminderStatus}
            editReminderTemplate={this.editReminderTemplate}
            showActionSheet={this.showActionSheet}
            reminderData={
              this.props.reminderData ? this.props.reminderData.reminders : []
            }
          />
        </ScrollContainer>
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={"Please select type"}
          options={[
            "Remove single reminder",
            "Remove reminder template",
            "cancel",
          ]}
          cancelButtonIndex={2}
          onPress={(index) => {
            if (index !== 2) {
              this.removeParticularReminder(this.state.selectedItem, index);
            }
          }}
        />
      </AppContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reminderData: state.reminderReducer.reminderData,
    petData: state.petReducer.petData,
    combineLabel: state.labelReducer.combineLabel,
    labelNames: state.labelReducer.labelNames,
  };
};

const mapDispatchToProps = (dispatch, ownprops) => {
  return {
    removeReminder: (value, loader) => dispatch(removeReminder(value, loader)),
    getReminderByPet: (filter, showLoader) =>
      dispatch(getReminderByPet(filter, showLoader)),
    showLoader: (value) => dispatch(setLoader(value)),
    storePushToken: (value) => dispatch(storePushToken(value)),
    getReminderTemplate: (data, loader) =>
      dispatch(getReminderTemplate(data, loader)),
    updateReminderStatus: (value, loader) =>
      dispatch(updateReminderStatus(value, loader)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReminderDashboard);
