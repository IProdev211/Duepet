import React, { Component } from "react";
import { View } from "react-native";
import styled from "styled-components";
import ThemeStyle from "styles/theme";
import CustomText from "../CustomText";
import I18nContext from "translations/I18nContext";
import More from "../Icons/MoreDot";
import ToggleSwitch from "../Icons/ToggleSwitch";
import CustomPicker from "../CustomPicker";
import { RespScreenHeight, RespScreenWidth } from "styles/sizes";
import sessionService from "service/sessionService";
import alertService from "service/alertService";
import { TouchableOpacity } from "react-native-gesture-handler";
import { userLogout } from "../../redux/actions";
import { connect } from "react-redux";
import CustomDropdownSelect from "components/CustomDropdownSelect";
import { DownDark as Down } from "../Icons/DownDark";

interface IProps {
  navigation: any;
  onChange: any;
  userLogout: () => void;
}

interface IState {
  theme_color: boolean;
  enabled_notifications: boolean;
  swipe_actions: boolean;
  language: string;
}

class SettingList extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      theme_color: false,
      enabled_notifications: false,
      swipe_actions: false,
      language: "en"
    };
  }

  handleLabelMenu = index => {
    if (index == 1) {
      this.props.navigation.navigate("Label");
    } else if (index == 0) {
      this.props.navigation.navigate("AddLabel");
    }
  };

  onhandleGeneral = (isOn, themeToggle) => {
    this.props.onChange({ theme_color: isOn });
    themeToggle.toggle();
  };

  onhandleNotification = isOn => {
    this.setState({ enabled_notifications: !this.state.enabled_notifications });
    this.props.onChange({
      enabled_notifications: !this.state.enabled_notifications
    });
  };

  onhandleSwipeAction = isOn => {
    this.setState({ swipe_actions: !this.state.swipe_actions });
    this.props.onChange({ swipe_actions: !this.state.swipe_actions });
  };

  onhandleLanguage = language => {
    this.props.onChange({ language });
  };

  async componentDidMount() {
    const userData = await sessionService.getStorageData("userData");
    this.setState({
      theme_color: userData.theme_color,
      swipe_actions: userData.swipe_actions,
      enabled_notifications: userData.enabled_notifications,
      language: userData.language
    });
  }

  render() {
    const {
      theme_color,
      swipe_actions,
      language,
      enabled_notifications
    } = this.state;

    const Background = styled(View)`
      width: ${RespScreenWidth(100)};
      padding-vertical: ${RespScreenWidth(5)};
      border-radius: 15px;
      margin-top: ${RespScreenHeight(1)};
      background-color: ${ThemeStyle.backgroundWhite};
    `;
    const ContainerView = styled.View`
      padding-horizontal: ${RespScreenWidth(5)};
    `;
    return (
      <Background>
        <ContainerView>
          <CustomText
            value={I18nContext.getString("settings_label")}
            label={I18nContext.getString("settings_label_label")}
            icon={
              <More
                actions={["Create Labels", "View Labels"]}
                setting={true}
                handleAction={this.handleLabelMenu}
              />
            }
          />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Support");
            }}
          >
            <CustomText
              value={I18nContext.getString("settings_supprot")}
            />
          </TouchableOpacity>
          <CustomText
            value={I18nContext.getString("settings_notifications")}
            icon={
              <ToggleSwitch
                onToggle={this.onhandleNotification}
                isOn={enabled_notifications}
              />
            }
          />
          <CustomText
            value={I18nContext.getString("settings_swipe_action")}
            label={I18nContext.getString("settings_swipe_action_label_"+ this.state.swipe_actions)}
            icon={
              <ToggleSwitch
                onToggle={this.onhandleSwipeAction}
                isOn={swipe_actions}
              />
            }
          />
          <CustomPicker
            items={[
              { label: "English", value: "en" },
              { label: "French", value: "fr" }
            ]}
            placeholder={{
              value: language
            }}
            onChange={this.onhandleLanguage}
          />
          <TouchableOpacity onPress={() => {}}>
            <CustomText
              value={I18nContext.getString("settings_share_with_friends")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <CustomText
              value={I18nContext.getString("settings_terms_and_conditions")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("ChangePassword");
            }}
          >
            <CustomText value={I18nContext.getString("change_password")} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Profile");
            }}
          >
            <CustomText value={I18nContext.getString("my_profile")} />
          </TouchableOpacity>
          <CustomText
            value={I18nContext.getString("settings_web_user_policy")}
          />
          <CustomText
            value={I18nContext.getString("settings_privacy_policy")}
          />
          <TouchableOpacity
            onPress={() => {
              alertService
                .confirmAlert("Confirm", "Are you sure you want to logout?")
                .then(resp => {
                  if (resp) {
                    sessionService
                      .setStorageData("userData", null)
                      .then(resp => {
                        this.props.userLogout();
                        this.props.navigation.navigate("Login");
                      });
                  }
                });
            }}
          >
            <CustomText value={I18nContext.getString("logout")} />
          </TouchableOpacity>
        </ContainerView>
      </Background>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch(userLogout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingList);
