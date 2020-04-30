import React, { Component } from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import Action from "components/Action";
import ThemeStyle from "styles/theme";
import { FontSize, RespScreenHeight, RespScreenWidth } from "styles/sizes";
import I18nContext from "translations/I18nContext";
import { AppContainer } from "styles/designSystem";
import { NavigationEvents } from "react-navigation";
import { EventRegister } from "react-native-event-listeners";

interface Props {
  navigation: any;
}

class AddActionPanel extends Component<Props> {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    headerShown: false
  };

  onDidBlur = payload => {
    EventRegister.emit("ACTION_PANEL_OPEN");
  };

  render() {
    const ActionList = styled(View)`
      flex: 1;
      flex-direction: column-reverse;
      margin-bottom: ${RespScreenHeight(17)};
    `;

    const AppTitleText = styled(Text)`
      font-size: ${FontSize.xxxxl};
      color: ${ThemeStyle.commonText};
    `;

    const AppTitleView = styled(View)`
      margin-top: ${RespScreenHeight(6)};
      margin-left: ${RespScreenWidth(4)};
    `;

    return (
      <AppContainer>
        <NavigationEvents onDidBlur={payload => this.onDidBlur(payload)} />
        <AppTitleView>
          <AppTitleText>{I18nContext.getString("duepet")}</AppTitleText>
        </AppTitleView>
        <ActionList>
          <Action
            actionTitle={I18nContext.getString("action_panel_feedback")}
            onPress={() => this.props.navigation.navigate("Support")}
          />
          <Action
            actionTitle={I18nContext.getString("action_panel_label")}
            onPress={() => this.props.navigation.navigate("AddLabel")}
          />
          <Action
            actionTitle={I18nContext.getString("action_panel_pet")}
            onPress={() =>
              this.props.navigation.navigate("AddPetProfile", {
                petData: {
                  name: "",
                  image: { uri: "" },
                  gender: "-1",
                  type: {},
                  birth_date: {
                    day: "1",
                    month: "1",
                    year: "2000"
                  },
                  initialWeight: ""
                },
                editMode: false
              })
            }
          />
          <Action
            actionTitle={I18nContext.getString("action_panel_tracker")}
            onPress={() => this.props.navigation.navigate("AddTracker")}
          />
          <Action
            actionTitle={I18nContext.getString("action_panel_reminder")}
            onPress={() => this.props.navigation.navigate("AddReminder", {})}
          />
        </ActionList>
      </AppContainer>
    );
  }
}

export default AddActionPanel;
