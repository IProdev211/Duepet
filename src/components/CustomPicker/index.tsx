import React, { Component } from "react";
import styled, { withTheme } from "styled-components";
import { View, StyleSheet } from "react-native";
import ThemeStyle from "styles/theme";
import ThemeVariables from "styles/themeVariables";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import RNPickerSelect from "react-native-picker-select";
import { DownDark as Down } from "../Icons/DownDark";

interface Props {
  placeholder: Object;
  items: Array<any>;
  onChange: any;
  style: any;
}

const PickerContainer = styled(View)`
border-bottom-width: 1px;
border-color: ${ThemeStyle.backgroundDark};
`;

class CustomPicker extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      selected: props.placeholder.value
    };
  }

  onhandleChange = value => {
    const { onChange } = this.props;
    this.setState({ selected: value });
    onChange(value);
  };

  render() {
    const { items, style } = this.props;
    return (
      <PickerContainer style={style}>
        <RNPickerSelect
          value={this.state.selected}
          items={items}
          onValueChange={value => {
            this.onhandleChange(value);
          }}
          style={{
            ...pickerSelectStyles(this.props),
            iconContainer: {
              right: wp("3%"),
              top: hp("3.5%")
            }
          }}
          useNativeAndroidPickerStyle={false}
          Icon={() => {
            return <Down />;
          }}
        />
      </PickerContainer>
    );
  }
}

const pickerSelectStyles = props =>
  StyleSheet.create({
    inputIOS: {
      fontSize: 24,
      paddingVertical: 12,
      marginLeft: wp("1%"),
      paddingRight: wp("9%"), // to ensure the text is never behind the icon
      color: ThemeVariables[props.theme.mode].descriptionTextDark
    },
    inputAndroid: {
      fontSize: 20,
      paddingVertical: hp("1.5%"),
      marginLeft: wp("1%"),
      paddingRight: wp("9%"), // to ensure the text is never behind the icon
      color: ThemeVariables[props.theme.mode].descriptionTextDark
    }
  });

export default withTheme(CustomPicker);
