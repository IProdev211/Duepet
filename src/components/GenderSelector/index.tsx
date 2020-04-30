import React, { Component } from "react";
import styled from "styled-components";
import { View, Text } from "react-native";
import ThemeStyle from "styles/theme";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";
import MaleIcon from "../Icons/Male";
import FemaleIcon from "../Icons/Female";

interface IProps {
  label: string;
  valueSelectChange?: any;
  maleSelect?: boolean;
  editable?: boolean;
  textAlignRight?: boolean;
  validationError?: any;
}

const Container = styled(View)`
  flex-direction: column;
  margin-horizontal: ${RespScreenWidth(6)};
  padding-vertical: 5px;
`;

const SelectorContainer = styled(View)`
  flex-direction: row-reverse;
  padding-horizontal: ${RespScreenWidth(1)};
  border-bottom-width: 1px;
  border-color: ${ThemeStyle.commonText};
`;

const LabelText = styled(Text)`
  font-size: ${FontSize.sm};
  color: ${ThemeStyle.commonText};
  margin-top: ${RespScreenHeight(1)};
`;

const MaleIconContainer = styled(View)`
  margin-right: ${RespScreenWidth(8)};
`;

class GenderSelector extends Component<
  IProps,
  { maleSelect: string; editable: boolean }
> {
  constructor(props) {
    super(props);
    this.state = {
      maleSelect: "-1",
      editable: props.editable
    };
  }

  handleSelectMale = () => {
    this.setState({ maleSelect: "1" });
    this.props.valueSelectChange("1");
  };

  handleSelectFemale = () => {
    this.setState({ maleSelect: "0" });
    this.props.valueSelectChange("0");
  };

  static getDerivedStateFromProps(props, state) {
    if (props.maleSelect != undefined) {
      if (
        props.editable != state.editable ||
        props.maleSelect != state.maleSelect
      ) {
        return {
          editable: props.editable,
          maleSelect: props.maleSelect
        };
      }
      return null;
    }
    return null;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (this.props.maleSelect !== prevProps.maleSelect) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (snapShot) {
      this.setState({
        maleSelect: this.props.maleSelect
      });
    }
  }

  render() {
    return (
      <Container>
        {this.props.label && <LabelText>{this.props.label}</LabelText>}
        {this.props.editable && (
          <SelectorContainer>
            <FemaleIcon
              onPress={this.handleSelectFemale}
              femaleSelect={this.state.maleSelect === "0"}
            />
            <MaleIconContainer>
              <MaleIcon
                onPress={this.handleSelectMale}
                maleSelect={this.state.maleSelect === "1"}
              />
            </MaleIconContainer>
          </SelectorContainer>
        )}
        <View style={{ alignItems: "flex-end", paddingTop: 2 }}>
          {!this.props.textAlignRight &&
            !this.props.editable &&
            this.state.maleSelect === "0" && (
              <FemaleIcon femaleSelect={this.state.maleSelect === "0"} />
            )}
          {!this.props.textAlignRight &&
            !this.props.editable &&
            this.state.maleSelect === "1" && (
              <MaleIcon maleSelect={this.state.maleSelect === "1"} />
            )}
        </View>
        <View>{this.props.validationError}</View>
      </Container>
    );
  }
}

export default GenderSelector;
