import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import styled, { withTheme } from "styled-components";
import { FontSize } from "styles/sizes";
import ThemeStyle from "styles/theme";
import ThemeVariables from "styles/themeVariables";
import RNPikcerSelect, { Item } from "react-native-picker-select";
import I18nContext from "translations/I18nContext";
import { Down } from "../Icons/Down";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

interface Props {
  handlePickTimezone: any;
}

interface IState {
  timezoneArray?: Item[];
  selectedTimezone?: string;
}

class TimezonePicker extends Component<Props, IState> {
  constructor(props) {
    super(props);
    this.state = {
      timezoneArray: [],
      selectedTimezone: "UTC"
    };
  }

  componentDidMount() {
    const ct = require("countries-and-timezones");
    const timezoneLists = ct.getAllTimezones();
    let timezoneArray: Array<Item> = [];
    Object.keys(timezoneLists).map(key => {
      timezoneArray.push({
        label:
          "GMT " +
          timezoneLists[key].utcOffsetStr +
          " " +
          timezoneLists[key].name,
        value: key
      });
    });
    this.setState({ timezoneArray: [...timezoneArray] });
  }

  handleChange = value => {
    const { handlePickTimezone } = this.props;
    this.setState({ selectedTimezone: value });

    handlePickTimezone(value);
  };

  render() {
    const Container = styled(View)`
      align-items: center;
    `;

    const TimezoneTitle = styled(Text)`
      font-size: ${FontSize.lg};
      color: ${ThemeStyle.commonText};
    `;

    return (
      <Container>
        <TimezoneTitle>
          {I18nContext.getString("settings_timezone")}
        </TimezoneTitle>
        <View style={{ width: "100%" }}>
          <RNPikcerSelect
            items={this.state.timezoneArray}
            onValueChange={value => {
              this.handleChange(value);
            }}
            style={{
              ...pickerSelectStyles(this.props),
              iconContainer: {
                top: wp("5%"),
                right: wp("12.5%")
              }
            }}
            value={this.state.selectedTimezone}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return <Down />;
            }}
          />
        </View>
      </Container>
    );
  }
}

const pickerSelectStyles = props =>
  StyleSheet.create({
    inputAndroid: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: wp("1.25%"),
      marginHorizontal: wp("10%"),
      paddingVertical: hp("1%"),
      borderRadius: 12,
      paddingRight: wp("10%"),
      paddingLeft: wp("2.5%"),
      color: ThemeVariables[props.theme.mode].commonText,
      backgroundColor: ThemeVariables[props.theme.mode].backgroundLight
    },
    inputIOS: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: wp("1.25%"),
      marginHorizontal: wp("10%"),
      paddingVertical: hp("1%"),
      borderRadius: 12,
      paddingRight: wp("10%"),
      paddingLeft: wp("2.5%"),
      color: ThemeVariables[props.theme.mode].commonText,
      backgroundColor: ThemeVariables[props.theme.mode].backgroundLight
    }
  });

export default withTheme(TimezonePicker);
