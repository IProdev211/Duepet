import React, { Component } from "react";
import { AppContainer, KeyboardAvoiding, ScrollContainer, PetImageSlider, DialogText, CheckMarkIcon } from "styles/designSystem";
import { IProps } from "store/interface";
import CustomInput from "components/CustomInput";
import I18nContext from "translations/I18nContext";
import { View, Text, TouchableOpacity, Image, Alert, Platform } from "react-native";
import ThemeStyle from "styles/theme";
import styled from "styled-components";
import Button from "components/SmallButton";
import { Schedule } from "components/Icons/Schedule";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";
import ToggleSwitch from "components/Icons/ToggleSwitch";
import { Calendar } from "components/Icons/Calender";
import CustomDropdownSelect from "components/CustomDropdownSelect";
import moment from "moment";
import { connect } from "react-redux";
import { Down } from "components/Icons/Down";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PopupDialog from "components/CustomPopupDialog";
import _ from "lodash";
import { setLoader, addReminder, getCombineLabel, updateReminder, setDialog, setDialogTitle, setDialogContain, setDialogFooter } from "../../../redux/actions";
import PetImagesScrollView from "components/PetImagesScrollView";


const ReminderContainer = styled(View)`
  flex-direction: row;
  margin-horizontal: ${props =>
    props.marginHz ? RespScreenWidth(props.marginHz) : RespScreenWidth(6)};
  padding-top: ${RespScreenHeight(2.9)};
  padding-bottom: ${RespScreenHeight(1.5)};
  ${props => (props.rightSpace ? "margin-right : " + RespScreenWidth(6) : "")};
`;

const ReminderTitle = styled(Text)`
  color: ${ThemeStyle.commonText};
  margin-top: auto;
  margin-bottom: auto;
  font-size: ${FontSize.xl};
  margin-left: ${props =>
    props.spaceLeft ? RespScreenWidth(3) : RespScreenWidth(0)};
`;

const ToggleContainer = styled(View)`
  margin-left: auto;
`;

const OftenContainer = styled(View)`
  flex-direction: row;
`;

const FirstReminderContainer = styled(View)`
  align-items: center;
  margin-top: ${RespScreenHeight(5)};
`;
const FirstReminderImage = styled(Image)`
  width: ${RespScreenWidth(25)};
  height: ${RespScreenWidth(25)};
  border-radius: ${RespScreenWidth(20)};
`;

const FirstReminderSubTitle = styled(Text)`
  font-size: ${FontSize.lg};
  color: ${ThemeStyle.commonText};
  opacity: 0.8;
`;

const Frequnacy = styled(View)`
  flex: 0.5;
  margin-horizontal: ${RespScreenWidth(3.5)};
`;
const Repeats = styled(View)`
  flex: 0.5;
  margin-horizontal: ${RespScreenWidth(3.5)};
`;
const StartDate = styled(TouchableOpacity)`
  flex: 1;
`;

const ClearText = styled(Text)`
color : ${ThemeStyle.commonText};
margin-top : auto;
font-size :${FontSize.xl}
margin-bottom : auto;
`;
const ClearTextTouchable = styled(TouchableOpacity)`
  margin-right: ${RespScreenWidth(6)};
`;

const EndDate = styled(View)`
  flex: 0.7;
  margin-left: auto;
`;

const styledText = tag => styled(tag)`
  flex-direction: row;
  margin-horizontal: ${RespScreenWidth(6)};
  border-bottom-width: 1px;
  border-color: ${ThemeStyle.commonText};
  padding-top: ${RespScreenHeight(1.5)};
  opacity: ${props => (props.opacity ? 0.5 : 1)};
  font-size: ${FontSize.xl};
  color: ${ThemeStyle.commonText};
`;

const ReminderList = styledText(View);

const NotificationList = styledText(Text);

const ReminderItem = styled(Text)`
  font-size: ${FontSize.xl};
  color: ${ThemeStyle.commonText};
`;

const CheckMark = styled(View)`
  margin-left: auto;
`;

const OptionalText = styled(Text)`
  color: ${ThemeStyle.commonText};
  opacity: 0.5;
`;

interface IComponent extends IProps {
  minDate: any;
  componentFrame: any;
  datePicker: boolean;
  date: any;
  mode: any;
  singleMode: boolean;
  startDate: any;
  endDate: any;
  startTime: any;
  endTime: any;
  frequency: any;
  selectedType: string;
  addReminderObject: any;
  notifications: any;
  selectedNotificationIndex: number;
  reminderListShow: boolean;
  repeatEvent: boolean;
  reminder: any;
  selectedLabel: Array<object>;
  multiSelectValue: string;
  showLevel2: boolean;
  singleDate: any;
  reminderTemplate: any;
  petList: Array<any>;
  selectedPet: number;
  combineLabel: any;
  labelNames: Array<string>;
  reminderPage: any;
  petIds: Array<string>;
  labelIds: Array<string>;
  getCombineLabel: (value) => {},
  showLoader: (value) => {},
  addReminder: (value, navigation, loader) => {},
  updateReminder: (value, navigation, loader) => {},
  setDialog: (value: boolean) => {};
  setDialogTitle: (value: string) => {};
  setDialogContain: (value: any) => {};
  setDialogFooter: (value: boolean) => {};
}

interface ReminderLabel {
  label: string;
  title: string;
  name: string;
}

class AddReminder extends Component<IComponent> {
  state = {
    componentFrame: {},
    datePicker: false,
    date: new Date(),
    addReminderObject: {},
    notifications: [],
    singleMode: false,
    reminderListShow: false,
    repeatEvent: false,
    frequency: [],
    reminder: {},
    selectedLabel: [],
    petIds: [],
    showLevel2: false,
    petList: [],
    selectedPet: 0
  } as IComponent;
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCombineLabel(this.props.showLoader);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.startDate === undefined ||
      this.state.startDate === null ||
      this.state.selectedLabel.length === 0
    ) {
      if (
        this.props.navigation.state.params &&
        this.props.navigation.state.params.editable
      ) {
        this.setState({ startDate: new Date() });
        const reminderProps = this.props.reminderTemplate.reminder;
        if (reminderProps) {
          const reminderObject: any = {};
          reminderObject.frequency = reminderProps.values.length;
          reminderObject.repeats = reminderProps.repeats;
          // reminderObject.repeats = "daily";
          const labelArray = [];
          const labelObject = reminderProps.label;
          labelObject.title = reminderProps.title;
          labelArray.push(labelObject);
          if (reminderProps.repeats === "never") {
            this.setState({ showLevel2: false });
            this.setState({ singleDate: new Date() });
          } else {
            this.setState({ showLevel2: true });
          }
          this.setState({ selectedLabel: labelArray });
          this.setState(
            {
              addReminderObject: reminderObject
            },
            () => {
              this.resetNotificationsArray();
            }
          );
        }
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.petData) != JSON.stringify(state.petList)) {
      return {
        petList: props.petData.slice()
      };
    }
    return null;
  }

  getTrackerIndex = index => {
    if (index != null) this.setState({ selectedPet: index });
  };

  conditionalWrap = childern => {
    return this.state.addReminderObject.frequency &&
      this.state.addReminderObject.repeats &&
      this.state.addReminderObject.repeats !== "never"
      ? childern
      : null;
  };

  selectLabel = item => {
    const selectedItem = [];
    const labelIds = [];
    item.map((data, index) => {
      if (data && data !== "") {
        const labelObj = this.props.combineLabel.labels[index];
        labelObj.label = data;
        labelObj.label_id = this.props.combineLabel.labels[index].id;
        selectedItem.push(labelObj);
        labelIds.push(this.props.combineLabel.labels[index].id);
      }
    });
    const items = item.filter(data => {
      if (data && data !== "") {
        return data;
      }
    });
    this.setState({ multiSelectValue: items.toString() });
    this.setState({ selectedLabel: selectedItem });
    this.setState({ labelIds: labelIds });
    return selectedItem;
  };

  handleRemiderList = isOn => {
    this.setState({ reminderListShow: !this.state.reminderListShow });
    this.setState({ reminder: null });
  };

  renderTitle(icon, title, toogle) {
    return (
      <ReminderContainer>
        <ReminderTitle>{I18nContext.getString(title)}</ReminderTitle>
        {toogle ? (
          <ToggleContainer>
            <ToggleSwitch
              isOn={this.state.reminderListShow}
              onToggle={this.handleRemiderList}
            />
          </ToggleContainer>
        ) : null}
      </ReminderContainer>
    );
  }

  regenerateNotificationsAlert(date, interVal?) {
    if (this.state.startTime && this.state.endTime) {
      if (this.state.addReminderObject.frequency > 1) {
        const difference = this.state.endTime - this.state.startTime;
        let calculateHours = difference / 1000;
        calculateHours /= 60 * 60;
        const hours = calculateHours;
        if (difference < 0) {
          if (Platform.OS === "ios") {
            this.props.setDialogTitle("Opps!");
            this.props.setDialogContain(<DialogText>Your start time is greater  than end time.</DialogText>)
            this.props.setDialogFooter(true);
            this.props.setDialog(true);
          } else {
            Alert.alert("Opps!", "Your start time is greater  than end time.");
          }

          return false;
        } else if (this.state.addReminderObject.repeats === "daily") {
          if (hours > 24) {
            if (Platform.OS === "ios") {
              this.props.setDialogTitle("Opps!");
              this.props.setDialogContain(<DialogText>Your selected time is more than 24 hour.</DialogText>)
              this.props.setDialogFooter(true);
              this.props.setDialog(true);
            } else {
              Alert.alert("Opps!", "Your selected time is more than 24 hour.");
            }
            return false;
          }
        }
        let interval;
        if (hours < 17) {
          interval = hours / (this.state.addReminderObject.frequency - 1);
        } else {
          interval = hours / this.state.addReminderObject.frequency;
        }
        this.generateTime(
          new Date(this.state.startTime),
          interval,
          "secondCall",
          hours
        );
      } else {
        const notificationArray = [];
        notificationArray.push({ selectedTime: this.state.startTime });
        this.setState({ notifications: notificationArray });
      }
    } else {
      if (this.state.addReminderObject.frequency > 0 && date) {
        this.setState({ startTime: date.getTime() });
        if (this.state.addReminderObject.repeats === "daily") {
          this.setState({
            endTime: new Date(
              date.getTime() +
              (this.state.addReminderObject.frequency - 1) *
              interVal *
              60 *
              60 *
              1000
            ).getTime()
          });
          this.generateTime(date, interVal);
        } else {
          this.generateTime(date);
        }
      }
    }
  }

  generateTime(date, interVal?, call?, hours?) {
    const notificationArray = [];
    let convertTime;
    for (let i = 0; i < this.state.addReminderObject.frequency; i++) {
      if (interVal) {
        convertTime = moment(
          new Date(date.getTime() + i * interVal * 60 * 60 * 1000)
        ).valueOf();
      } else {
        if (this.state.addReminderObject.repeats !== "yearly") {
          convertTime = moment(date)
            .add(i, "days")
            .valueOf();
        } else {
          convertTime = moment(date)
            .add(i, "M")
            .valueOf();
        }
        if (i + 1 === parseInt(this.state.addReminderObject.frequency)) {
          this.setState({ endTime: convertTime });
        }
      }
      if (call === "secondCall") {
        if (i === 0) {
          convertTime = this.state.startTime;
        }
        if (i === this.state.addReminderObject.frequency - 1 && hours < 16) {
          convertTime = this.state.endTime;
        }
      }
      notificationArray.push({ selectedTime: convertTime });
    }
    this.state.notifications = notificationArray;
    this.setState({ notifications: notificationArray });
    this.calculateMinDate();
  }

  calculateInterval(days) {
    return (24 * days) / this.state.addReminderObject.frequency;
  }

  generateFreuencyArray(frequency) {
    const frequencyArray = [];
    for (let i = 1; i <= frequency; i++) {
      frequencyArray.push(i);
    }
    this.setState({ frequency: frequencyArray });
  }

  handleRepeatsEvent = () => {
    this.setState({ repeatEvent: !this.state.repeatEvent });
  };

  handleLevel = () => {
    if (this.state.showLevel2) {
      const data = this.state.addReminderObject;
      delete data.frequency;
      delete data.repeats;
      this.setState({ addReminderObject: data });
    }
    this.setState({ showLevel2: !this.state.showLevel2 });
  };

  resetNotificationsArray(changeRepeats?) {
    const todayDate = this.state.startDate;
    if (
      this.state.addReminderObject.repeats &&
      this.state.addReminderObject.repeats !== "never"
    ) {
      let days;
      if (this.state.addReminderObject.repeats === "daily") {
        days = 1;
        this.generateFreuencyArray(24);
      } else if (this.state.addReminderObject.repeats === "weekly") {
        days = 7;
        this.generateFreuencyArray(7);
      } else if (this.state.addReminderObject.repeats === "fortnightly") {
        days = 14;
        this.generateFreuencyArray(14);
      } else if (this.state.addReminderObject.repeats === "monthly") {
        days = this.getCurrentMonthDays();
        this.generateFreuencyArray(28);
      } else if (this.state.addReminderObject.repeats === "yearly") {
        days = this.checkLeap("year");
        this.generateFreuencyArray(12);
      }
      this.state.startTime = null;
      this.state.endTime = null;
      const interVal = this.calculateInterval(days);
      if (changeRepeats === undefined) {
        this.regenerateNotificationsAlert(todayDate, interVal);
      }
    } else {
      this.setState({ notifications: [] });
    }
  }

  getCurrentMonthDays() {
    const todayDate = new Date();
    const currentMonth = todayDate.getMonth();
    switch (currentMonth) {
      case 1:
        return this.checkLeap("month");
      case 0:
      case 2:
      case 4:
      case 6:
      case 7:
      case 9:
      case 11:
        return 31;
      case 3:
      case 5:
      case 8:
      case 10:
        return 30;
    }
  }

  checkLeap(type) {
    const today: any = new Date();
    if (today.getYear() % 4 === 0) {
      if (type === "month") {
        return 29;
      }
      if (type === "year") {
        return 366;
      }
    } else {
      if (type === "month") {
        return 28;
      } else {
        return 365;
      }
    }
  }

  tooglePicker = (type, index?) => {
    if (type === "" || type === undefined) {
      this.setState({ datePicker: false });
      return false;
    }
    if (index >= 0) {
      this.setState({ selectedNotificationIndex: index });
    }
    this.setState({ selectedType: type });
    if (type === "start" || type === "end") {
      this.setState({ mode: "date" });
    } else if (type === "alert") {
      this.setState({ mode: "datetime" });
    }
    if (this.state.addReminderObject.repeats === "daily") {
      if (
        index === undefined ||
        index === 0 ||
        index === this.state.notifications.length - 1
      ) {
        this.setState({ datePicker: !this.state.datePicker });
      }
    }
    if (this.state.addReminderObject.repeats !== "daily") {
      this.setState({ datePicker: !this.state.datePicker });
    }
  };

  calculateMinDate() {
    if (this.state.notifications.length > 0) {
      const minDate: any = _.minBy(this.state.notifications, "selectedTime");
      this.setState({ minDate: minDate.selectedTime });
    }
  }

  handleConfirm = date => {
    if (this.state.mode === "date") {
      const convertDate = date.getTime();
      if (this.state.selectedType === "start") {
        date.setHours(0, 0, 0, 0);
        this.setState({ singleDate: date });
        this.setState(
          {
            startDate: date
          },
          () => {
            var d = new Date();
            d.setHours(0, 0, 0, 0);
            if (date.getTime() === d.getTime()) {
              this.setState({ singleDate: new Date() });
              this.setState(
                {
                  startDate: new Date()
                },
                () => {
                  this.resetNotificationsArray();
                }
              );
            } else {
              this.resetNotificationsArray();
            }
          }
        );
      } else if (this.state.selectedType === "end") {
        this.setState({ endDate: convertDate });
      }
    } else {
      if (this.state.addReminderObject.repeats === "daily") {
        if (this.state.selectedNotificationIndex === 0) {
          this.state.startTime = date.getTime();
        } else if (
          this.state.selectedNotificationIndex ===
          this.state.notifications.length - 1
        ) {
          this.state.endTime = date.getTime();
        }
        this.regenerateNotificationsAlert(this.state.startTime);
      } else {
        if (date.getTime() >= this.state.startDate) {
          const calculateDiff = date.getTime() - this.state.minDate;
          let calculateHours = calculateDiff / 1000;
          calculateHours /= 60 * 60;
          if (this.state.addReminderObject.repeats === "weekly") {
            if (calculateHours > 168) {
              if (Platform.OS === "ios") {
                this.props.setDialogTitle("Opps!");
                this.props.setDialogContain(<DialogText>Your selected time is more than 7 days.</DialogText>)
                this.props.setDialogFooter(true);
                this.props.setDialog(true);
              } else {
                Alert.alert("Opps!", "Your selected time is more than 7 days.");
              }

              return false;
            }
          } else if (this.state.addReminderObject.repeats === "fortnightly") {
            if (calculateHours > 336) {
              if (Platform.OS === "ios") {
                this.props.setDialogTitle("Opps!");
                this.props.setDialogContain(<DialogText>Your selected time is more than 14 days.</DialogText>)
                this.props.setDialogFooter(true);
                this.props.setDialog(true);
              } else {
                Alert.alert("Opps!", "Your selected time is more than 14 days.");
              }

              return false;
            }
          } else if (this.state.addReminderObject.repeats === "monthly") {
            if (calculateHours > 720) {
              if (Platform.OS === "ios") {
                this.props.setDialogTitle("Opps!");
                this.props.setDialogContain(<DialogText>Your selected time is more than 1 months.</DialogText>)
                this.props.setDialogFooter(true);
                this.props.setDialog(true);
              } else {
                Alert.alert("Opps!", "Your selected time is more than 1 months.");
              }
              return false;
            }
          } else if (this.state.addReminderObject.repeats === "yearly") {
            if (calculateHours > 8760) {
              if (Platform.OS === "ios") {
                this.props.setDialogTitle("Opps!");
                this.props.setDialogContain(<DialogText>Your selected time is more than 1 year.</DialogText>)
                this.props.setDialogFooter(true);
                this.props.setDialog(true);
              } else {
                Alert.alert("Opps!", "Your selected time is more than 1 year.");
              }
              return false;
            }
          }
          let shortValue;
          const notificationArray = this.state.notifications;
          notificationArray[
            this.state.selectedNotificationIndex
          ].selectedTime = date.getTime();
          shortValue = notificationArray.sort((a, b) => {
            return a.selectedTime - b.selectedTime;
          });
          this.setState({ showDatePicker: false });
          this.setState({ notifications: shortValue });
          this.calculateMinDate();
        } else {
          this.props.setDialogTitle("Opps!");
          this.props.setDialogContain(<DialogText>you can't select past date and time.</DialogText>)
          this.props.setDialogFooter(true);
          this.props.setDialog(true);
        }
      }
    }
    this.tooglePicker("");
  };

  setOpacity = index => {
    return (
      index !== 0 &&
      index !== this.state.notifications.length - 1 &&
      this.state.addReminderObject.repeats === "daily"
    );
  };

  toogleSinglePicker = () => {
    this.setState({ mode: "time" });
    this.setState({ singleMode: !this.state.singleMode });
  };

  handleSingleConfirm = date => {
    const setTime = this.state.singleDate;
    setTime.setHours(date.getHours());
    setTime.setMinutes(date.getMinutes());
    setTime.setSeconds(date.getSeconds());
    this.setState({ singleDate: setTime });
    this.setState({ singleMode: false });
  };

  createReminder = () => {
    if (
      this.state.selectedLabel.length === 0 ||
      this.state.startDate === undefined
    ) {
      if (Platform.OS === "ios") {
        this.props.setDialogTitle("Opps!");
        this.props.setDialogContain(<DialogText>Please enter all filed.</DialogText>)
        this.props.setDialogFooter(true);
        this.props.setDialog(true);
      } else {
        Alert.alert("Opps!", "Please enter all filed.");
      }

    } else if (this.state.petIds.length === 0) {
      if (Platform.OS === "ios") {
        this.props.setDialogTitle("Opps!");
        this.props.setDialogContain(<DialogText>Please select pets.</DialogText>)
        this.props.setDialogFooter(true);
        this.props.setDialog(true);
      } else {
        Alert.alert("Opps!", "Please select pets.");
      }
    } else {
      this.props.showLoader(true);
      const reminder_values = [];
      if (this.state.showLevel2) {
        this.state.notifications.map((item, index) => {
          reminder_values.push(new Date(item.selectedTime).toISOString());
        });
      } else {
        reminder_values.push(new Date(this.state.singleDate).toISOString());
      }
      const remiderTemplate: any = {};
      remiderTemplate.start_date = this.state.startDate;
      if (this.state.endDate) {
        remiderTemplate.end_date = new Date(this.state.endDate).toISOString();
      }
      if (this.state.reminderListShow) {
        remiderTemplate.time_before_start = this.state.reminder.value.toString();
      }
      if (this.state.showLevel2) {
        remiderTemplate.repeat = this.state.addReminderObject.repeats;
        remiderTemplate.freq = this.state.addReminderObject.frequency;
      } else {
        remiderTemplate.repeat = "daily";
        remiderTemplate.freq = 1;
      }
      remiderTemplate.reminder_values = reminder_values;
      if (this.props.navigation.state.params && this.props.navigation.state.params.editable) {
        remiderTemplate.reminder_template_id = this.props.reminderTemplate.reminder.id;
        remiderTemplate.pet_id = this.props.reminderTemplate.reminder.pet.id;
        remiderTemplate.reminder_label_id = this.props.reminderTemplate.reminder.label.id;
      } else {
        remiderTemplate.pet_ids = this.state.petIds;
        remiderTemplate.labels_titles = this.state.selectedLabel;
      }
      if (this.props.navigation.state.params && this.props.navigation.state.params.editable) {
        this.props.updateReminder(remiderTemplate, this.props.navigation, this.props.showLoader);
      } else {
        this.props.addReminder(remiderTemplate, this.props.navigation, this.props.showLoader);
      }
    }
  };

  selectReminder = item => {
    this.setState({ reminder: item });
  };

  handleSelectImage = (selected, item) => {
    if (item) {
      this.setState({ petIds: item });
    }
  }

  render() {
    const { petList, selectedPet } = this.state;
    const reminders = [
      {
        name: "At set time",
        value: 0
      },
      {
        name: "15min before",
        value: 15
      },
      {
        name: "30min before",
        value: 30
      },
      {
        name: "1hr before",
        value: 60
      },
      {
        name: "1day before",
        value: 1440
      }
    ];
    const repeats = [
      "daily",
      "weekly",
      "fortnightly",
      "monthly",
      "yearly",
      "never"
    ];
    return (
      <AppContainer>
        <KeyboardAvoiding
          behavior="padding"
          enabled
          keyboardVerticalOffset={80}
        >
          <ScrollContainer>
            {
              this.props.navigation.state.params === undefined || (this.props.navigation.state.params && this.props.navigation.state.params.editable === undefined) ?
                <PetImageSlider>
                  <PetImagesScrollView
                    source={petList}
                    multiple={true}
                    handleSelectImage={this.handleSelectImage}
                  />
                </PetImageSlider> : null
            }
            {
              this.props.navigation.state.params && this.props.navigation.state.params && this.props.navigation.state.params.editable && this.props.reminderTemplate.reminder ?
                <FirstReminderContainer>
                  <FirstReminderImage
                    source={{ uri: this.props.reminderTemplate.reminder.pet.avatar }}
                  />
                  <FirstReminderSubTitle>
                    {this.props.reminderTemplate.reminder.pet.name}
                  </FirstReminderSubTitle>
                </FirstReminderContainer> : null
            }

            {
              this.props.navigation.state.params === undefined || (this.props.navigation.state.params && this.props.navigation.state.params.editable === undefined) ? (
                <CustomDropdownSelect
                  afterIcon={<Down />}
                  editable={false}
                  defaultValue={this.state.multiSelectValue}
                  underline={true}
                  multiple={"true"}
                  onSelect={value => { }}
                  onConfirm={this.selectLabel}
                  label={I18nContext.getString("reminder_for")}
                  placeholder={"select"}
                  options={this.props.labelNames}
                />
              ) : null}

            {this.state.selectedLabel.map(
              (item: ReminderLabel, index: number) => {
                return (
                  <View key={index}>
                    <CustomInput
                      placeholder={item.label ? item.label : item.name}
                      editable={false}
                      valueChange={() => { }}
                    />
                    <CustomInput
                      placeholder={I18nContext.getString("title_location")}
                      editable={true}
                      value={item.title}
                      afterIcon={
                        <OptionalText>
                          {I18nContext.getString("optional")}
                        </OptionalText>
                      }
                      valueChange={value => {
                        const data = this.state.selectedLabel;
                        item.title = value;
                        data[index] = item;
                        this.setState({ selectedLabel: data });
                      }}
                    />
                  </View>
                );
              }
            )}
            <ReminderContainer marginHz={2.5} rightSpace={true}>
              <ReminderTitle spaceLeft={true}>
                {I18nContext.getString("start_date")}
              </ReminderTitle>
              <StartDate onPress={() => this.tooglePicker("start")}>
                <CustomInput
                  beforeIcon={<Calendar />}
                  placeholder={"start"}
                  underline={true}
                  value={
                    this.state.startDate
                      ? moment(this.state.startDate).format("DD.MM.YY")
                      : ""
                  }
                  editable={false}
                  valueChange={() => { }}
                />
              </StartDate>
            </ReminderContainer>

            <ReminderContainer marginHz={2.5} rightSpace={true}>
              <ReminderTitle spaceLeft={true}>
                {I18nContext.getString("repeats")}
              </ReminderTitle>
              <ToggleContainer>
                <ToggleSwitch
                  isOn={this.state.showLevel2}
                  onToggle={this.handleLevel}
                />
              </ToggleContainer>
            </ReminderContainer>
            {this.state.showLevel2 ? (
              <OftenContainer>
                <Repeats>
                  <CustomDropdownSelect
                    leftSide={"true"}
                    editable={false}
                    afterIcon={<Down />}
                    defaultValue={this.state.addReminderObject.repeats}
                    onSelect={value => {
                      const data = this.state.addReminderObject;
                      data.repeats = repeats[value];
                      data.frequency = null;
                      this.setState({ notifications: [] });
                      this.setState({ addReminderObject: data });
                      this.resetNotificationsArray();
                    }}
                    placeholder={"Repeats"}
                    options={repeats}
                  />
                </Repeats>
                <Frequnacy>
                  <CustomDropdownSelect
                    leftSide={"true"}
                    editable={false}
                    defaultIndex={4}
                    defaultValue={
                      this.state.addReminderObject.frequency
                        ? this.state.addReminderObject.frequency.toString()
                        : null
                    }
                    afterIcon={<Down />}
                    onSelect={value => {
                      const data = this.state.addReminderObject;
                      data.frequency = this.state.frequency[value];
                      this.setState({ addReminderObject: data });
                      this.resetNotificationsArray();
                    }}
                    placeholder={"Frequency"}
                    options={this.state.frequency}
                  />
                </Frequnacy>
              </OftenContainer>
            ) : null}

            {this.state.showLevel2 ? (
              <ReminderContainer marginHz={2.5} rightSpace={true}>
                <ReminderTitle spaceLeft={true}>
                  {I18nContext.getString("repeat_event")}
                </ReminderTitle>
                <ToggleContainer>
                  <ToggleSwitch
                    isOn={this.state.repeatEvent}
                    onToggle={this.handleRepeatsEvent}
                  />
                </ToggleContainer>
              </ReminderContainer>
            ) : null}

            {this.state.repeatEvent && this.state.showLevel2 ? (
              <OftenContainer>
                <EndDate>
                  <TouchableOpacity onPress={() => this.tooglePicker("end")}>
                    <CustomInput
                      beforeIcon={<Calendar />}
                      placeholder={"end"}
                      underline={true}
                      value={
                        this.state.endDate
                          ? moment(this.state.endDate).format("DD.MM.YY")
                          : ""
                      }
                      editable={false}
                      valueChange={() => { }}
                    />
                  </TouchableOpacity>
                </EndDate>
                <ClearTextTouchable
                  onPress={() => this.setState({ endDate: null })}
                >
                  <ClearText>{I18nContext.getString("clear")}</ClearText>
                </ClearTextTouchable>
              </OftenContainer>
            ) : null}
            {this.renderTitle(<Schedule />, "notification_alert", false)}
            {this.state.addReminderObject.frequency === undefined ||
              this.state.addReminderObject.repeats === undefined ||
              (this.props.navigation.state.params && this.props.navigation.state.params.editable &&
                this.state.addReminderObject.repeats === "never") ? (
                <TouchableOpacity onPress={() => this.toogleSinglePicker()}>
                  {this.state.singleDate ? (
                    <NotificationList width={18}>
                      {moment(this.state.singleDate).format(
                        "Do MMMM YYYY, h:mm a"
                      )}
                    </NotificationList>
                  ) : null}
                </TouchableOpacity>
              ) : null}
            {this.state.showLevel2
              ? this.conditionalWrap(
                this.state.notifications.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={this.setOpacity(index) ? 1 : 0.5}
                      onPress={() => this.tooglePicker("alert", index)}
                    >
                      <NotificationList
                        opacity={this.setOpacity(index)}
                        width={18}
                      >
                        {moment(item.selectedTime).format(
                          "Do MMMM YYYY, h:mm a"
                        )}
                      </NotificationList>
                    </TouchableOpacity>
                  );
                })
              )
              : null}
            {this.renderTitle(<Schedule />, "remind_me", true)}
            {this.state.reminderListShow
              ? reminders.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.selectReminder(item)}
                  >
                    <ReminderList>
                      <ReminderItem>{item.name}</ReminderItem>
                      {this.state.reminder &&
                        item.name === this.state.reminder.name ? (
                          <CheckMark>
                            <CheckMarkIcon
                              size={22}
                              name={"check"}
                            ></CheckMarkIcon>
                          </CheckMark>
                        ) : null}
                    </ReminderList>
                  </TouchableOpacity>
                );
              })
              : null}

            <Button
              text={I18nContext.getString("save")}
              onPress={() => this.createReminder()}
            />
          </ScrollContainer>
          <DateTimePickerModal
            mode={this.state.mode}
            isVisible={this.state.datePicker}
            onConfirm={this.handleConfirm}
            onCancel={this.tooglePicker}
          />
          <DateTimePickerModal
            mode={this.state.mode}
            isVisible={this.state.singleMode}
            onConfirm={this.handleSingleConfirm}
            onCancel={this.toogleSinglePicker}
          />
          <PopupDialog />
        </KeyboardAvoiding>
      </AppContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    reminderData: state.reminderReducer.reminderData,
    reminderTemplate: state.reminderReducer.reminderTemplate,
    petData: state.petReducer.petData,
    combineLabel: state.labelReducer.combineLabel,
    labelNames: state.labelReducer.labelNames
  };
};

const mapDispatchToProps = (dispatch, ownprops) => {
  return {
    addReminder: (reminderData, navigation, showLoader) =>
      dispatch(addReminder(reminderData, navigation, showLoader)),
    updateReminder: (reminderData, navigation, showLoader) =>
      dispatch(updateReminder(reminderData, navigation, showLoader)),
    showLoader: value => dispatch(setLoader(value)),
    getCombineLabel: showLoader => dispatch(getCombineLabel(showLoader)),
    setDialog: value => dispatch(setDialog(value)),
    setDialogTitle: value => dispatch(setDialogTitle(value)),
    setDialogContain: value => dispatch(setDialogContain(value)),
    setDialogFooter: value => dispatch(setDialogFooter(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReminder);
