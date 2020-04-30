import React, { Component } from "react";
import styled from "styled-components";
import { View, Text, NativeSyntheticEvent } from "react-native";
import ThemeStyle from "styles/theme";
import I18nContext from "translations/I18nContext";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";
import DropdownSelect from "components/CustomDropdownSelect";
import { Down } from "components/Icons/Down";

const Container = styled(View)`
  flex-direction: column;
  margin-horizontal: ${RespScreenWidth(6)};
  padding-vertical: 5px;
`;

const PickerContainer = styled(View)`
  flex-direction: row;
  padding-horizontal: ${RespScreenWidth(1)};
`;

const LabelText = styled(Text)`
  font-size: ${FontSize.sm};
  color: ${ThemeStyle.commonText};
  margin-top: ${RespScreenHeight(1)};
`;

const DayPickerContainer = styled(View)`
  flex: 0.25;
`;

const MonthPickerContainer = styled(View)`
  flex: 0.4;
`;

const YearPickerContainer = styled(View)`
  flex: 0.35;
`;

var Days = [];
var Months = [];
var Years = [];

for (var i = 1; i <= 31; i++) Days.push(i);
for (var i = 1; i <= 12; i++) Months.push(I18nContext.getString("months_" + i));
for (var i = 1970; i <= new Date().getFullYear(); i++) Years.push(i);

interface IProps {
  label: String;
  marginHz?: String;
  valueChange: any;
  value?: any;
  placeholder?: any;
  disabled?: boolean;
  editable?: boolean;
}

class BirthdayPicker extends Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {
      day: props.value ? props.value.day : "1",
      month: props.value ? props.value.month : 1,
      year: props.value ? props.value.year : "1970"
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.value) !== JSON.stringify(state)) {
      return {
        day: props.value.day,
        month: props.value.month,
        year: props.value.year
      };
    }
    return null;
  }

  handleChangeDay = value => {
    const _value = (Number(value) + 1).toString();
    this.setState({ day: _value });
    this.props.valueChange({ ...this.state, day: _value });
  };

  handleChangeMonth = value => {
    const _value = (Number(value) + 1).toString();
    this.setState({ month: _value });
    this.props.valueChange({ ...this.state, month: _value });
  };

  handleChangeYear = value => {
    const _value = (Number(value) + 1970).toString();
    this.setState({ year: _value });
    this.props.valueChange({ ...this.state, year: _value });
  };

  render() {
    return (
      <Container>
        {this.props.label && <LabelText>{this.props.label}</LabelText>}
        <PickerContainer>
          <DayPickerContainer>
            <DropdownSelect
              defaultValue={this.state.day}
              marginHz={"0"}
              leftSide={"true"}
              editable={false}
              disabled={this.props.disabled}
              afterIcon={<Down />}
              onSelect={this.handleChangeDay}
              placeholder={
                this.props.placeholder
                  ? this.props.placeholder.day.toString()
                  : "1"
              }
              options={Days}
            />
          </DayPickerContainer>
          <MonthPickerContainer>
            <DropdownSelect
              defaultValue={I18nContext.getString("months_" + this.state.month)}
              marginHz={"1"}
              leftSide={"true"}
              placeholder={
                this.props.placeholder
                  ? I18nContext.getString(
                      "months_" + this.props.placeholder.month.toString()
                    )
                  : "January"
              }
              editable={false}
              disabled={this.props.disabled}
              afterIcon={<Down />}
              onSelect={this.handleChangeMonth}
              options={Months}
            />
          </MonthPickerContainer>
          <YearPickerContainer>
            <DropdownSelect
              defaultValue={this.state.year}
              placeholder={
                this.props.placeholder
                  ? this.props.placeholder.year.toString()
                  : "2000"
              }
              marginHz={"0"}
              leftSide={"true"}
              editable={false}
              disabled={this.props.disabled}
              afterIcon={<Down />}
              onSelect={this.handleChangeYear}
              options={Years}
            />
          </YearPickerContainer>
        </PickerContainer>
      </Container>
    );
  }
}

export default BirthdayPicker;
