import React, { Component } from "react";
import styled from "styled-components";
import { View, ImageBackground, Alert } from "react-native";
import AddButton from "../AddButton";
import TabTracker from "./TabTracker";
import TabSchedule from "./TabSchedule";
import TabPetProfile from "./TabPetProfile";
import TabMore from "./TabMore";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { EventRegister } from "react-native-event-listeners";
import I18nContext from "translations/I18nContext";

interface Props {
  navigation: any;
}

class BottomNavigator extends Component<Props, { isPanelOpen: boolean }> {
  constructor(props) {
    super(props);

    this.state = {
      isPanelOpen: true
    };
  }

  handlePress = isOpen => {
    const { navigate, state } = this.props.navigation;

    const currentScreen = state.routes[state.index];
    const route = currentScreen.routes[currentScreen.index];
    if (isOpen) {
      navigate("AddAction", {
        go_to_back: route.routeName
      });
    } else {
      if (route && route.params && route.params.go_to_back == "AddAction") {
        this.props.navigation.pop();
      } else {
        if (route && route.params) {
          navigate(route.params.go_to_back);
        } else {
          navigate("Schedule");
        }
      }
    }
    this.setState({ isPanelOpen: !isOpen });
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    let state = prevProps.navigation.state;
    let currentScreen = state.routes[state.index];
    let prevRoute = currentScreen.routes[currentScreen.index];
    state = this.props.navigation.state;
    currentScreen = state.routes[state.index];
    let route = currentScreen.routes[currentScreen.index];
    if (prevRoute.routeName !== route.routeName) {
      return route.routeName;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot === "AddAction") {
      this.setState({ isPanelOpen: false });
    }
  }

  componentDidMount() {
    const { navigate, state } = this.props.navigation;

    const currentScreen = state.routes[state.index];
    const route = currentScreen.routes[currentScreen.index];

    if (route.routeName === "AddAction") {
      this.setState({ isPanelOpen: false });
    }

    EventRegister.addEventListener("ACTION_PANEL_OPEN", data => {
      this.setState({ isPanelOpen: true });
    });
  }

  componentWillUnmount() {
    EventRegister.removeAllListeners();
  }

  confirmNavigation = (route, params, navigation) => {
    if (params.isChanged()) {
      Alert.alert(
        I18nContext.getString("alert_edit_warn_title"),
        I18nContext.getString("alert_edit_warn_body"),
        [
          {
            text: I18nContext.getString("cancel"),
            style: "cancel"
          },
          {
            text: I18nContext.getString("ok"),
            onPress: () => {
              navigation.navigate(route);
            }
          }
        ],
        {
          cancelable: false
        }
      );
    } else {
      navigation.navigate(route);
    }
  };

  render() {
    const Background = styled(ImageBackground)`
      resize-mode: center;
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: ${hp("10%") + "px"};
    `;

    const Navigation = styled(View)`
      flex: 1;
      flex-direction: row;
      align-items: center;
      width: 100%;
    `;

    const NavRSection = styled(View)`
      flex: 1;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    `;
    const currentRoutes = this.props.navigation.state;
    const routes = currentRoutes.routes[currentRoutes.index];
    const routeName = routes.routes[routes.index].routeName;
    const { params = {} } = routes.routes[routes.index];
    return (
      <Background
        source={require("../../../assets/images/bottom_nav_bg/bottom_nav_bg.png")}
      >
        <AddButton
          onPress={this.handlePress}
          navigation={this.props.navigation}
          isOpen={this.state.isPanelOpen}
        />
        <Navigation>
          <TabSchedule
            onPress={() => {
              if (routeName === "AddPetProfile") {
                this.confirmNavigation(
                  "Schedule",
                  params,
                  this.props.navigation
                );
              } else {
                this.props.navigation.navigate("Schedule");
              }
            }}
          />
          <TabTracker
            onPress={() => {
              if (routeName === "AddPetProfile") {
                this.confirmNavigation(
                  "Trackers",
                  params,
                  this.props.navigation
                );
              } else {
                this.props.navigation.navigate("Trackers");
              }
            }}
          />
          <NavRSection>
            <TabPetProfile
              onPress={() => {
                if (routeName === "AddPetProfile") {
                  this.confirmNavigation(
                    "PetProfile",
                    params,
                    this.props.navigation
                  );
                } else {
                  this.props.navigation.navigate("PetProfile");
                }
              }}
            />
            <TabMore
              onPress={() => {
                if (routeName === "AddPetProfile") {
                  this.confirmNavigation(
                    "Setting",
                    params,
                    this.props.navigation
                  );
                } else {
                  this.props.navigation.navigate("Setting");
                }
              }}
            />
          </NavRSection>
        </Navigation>
      </Background>
    );
  }
}

export default BottomNavigator;
