import React, { Component } from "react";
import { withTheme } from "styled-components";
import { AppContainer } from "styles/designSystem";
import Constants from "expo-constants";
import I18nContext from "translations/I18nContext";
import TimezonePicker from "components/TimezonePicker";
import SettingList from "components/SettingList";
import UpgradeButton from "components/UpgradeButton";
import CustomText from "components/CustomText";
import PageTitle from "components/PageTitle";
import {
  TimezonePickerContainer,
  StatusText,
  Notification,
  ScrollViewContainer,
  VersionContainer
} from "./Setting.style";
import ThemeVariables from "styles/themeVariables";

interface IProps {
  updateUser: any;
  navigation: any;
  theme?: any;
}

const status = "I am going on holiday.";

class Setting extends Component<IProps> {
  static navigationOptions = state => {
    const params = state.navigation.state.params || {};
    return {
      headerStyle: {
        backgroundColor: params.backgroundColor
          ? params.backgroundColor
          : ThemeVariables["light"].backgroundDark
      },
      headerTintColor: params.tintColor
        ? params.tintColor
        : ThemeVariables["light"].commonText
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      theme: props.theme
    };
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (this.props.theme.mode != prevProps.theme.mode) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { theme, navigation } = this.props;
    if (snapshot) {
      navigation.setParams({
        backgroundColor: ThemeVariables[theme.mode].backgroundDark,
        tintColor: ThemeVariables[theme.mode].commonText
      });
    }
  }

  render() {
    const { updateUser, navigation } = this.props;

    return (
      <AppContainer>
        {/* <PageTitle title={I18nContext.getString("duepet")} /> */}
        <ScrollViewContainer>
          {/* <TimezonePickerContainer>
            <TimezonePicker
              handlePickTimezone={timezone => {
                updateUser({ timezone: timezone });
              }}
            />
          </TimezonePickerContainer> */}
          {/* <StatusText>{status}</StatusText> */}
          {/* <Notification>
            {I18nContext.getString("settings_change_notification") +
              "1st January"}
          </Notification> */}
          <SettingList
            navigation={navigation}
            onChange={data => {
              updateUser(data);
            }}
          />
          <UpgradeButton />
          <VersionContainer>
            <CustomText
              value={
                I18nContext.getString("settings_app_version") +
                "  " +
                Constants.manifest.version
              }
              textStyle={{ textAlign: "center" }}
            />
          </VersionContainer>
        </ScrollViewContainer>
      </AppContainer>
    );
  }
}

export default withTheme(Setting);
