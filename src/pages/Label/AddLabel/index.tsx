import React, { Component } from "react";
import styled from "styled-components";
import { RespScreenWidth, RespScreenHeight } from "styles/sizes";
import { AppContainer, DialogText } from "styles/designSystem";
import PageTitle from "components/PageTitle";
import I18nContext from "../../../translations/I18nContext";
import LabelInput from "components/LabelInput";
import Button from "components/SmallButton";
import { connect } from "react-redux";
import {
  addLabel,
  setLoader,
  setDialog,
  setDialogTitle,
  setDialogContain,
  setDialogFooter
} from "../../../redux/actions";
import { Alert, Platform, View } from "react-native";
import { IProps } from "store/interface";

const Container = styled(View)`
  margin-top: ${RespScreenHeight("8%")};
`;

const ButtonContainer = styled(View)`
  margin-top: ${RespScreenHeight("4%")};
`;

interface IState extends IProps {
  labelData: Object;
  addLabel: any;
  showLoader: (valuie: boolean) => {};
  addOrEditLabelLoading: boolean;
  setDialog: (value: boolean) => {};
  setDialogTitle: (value: string) => {};
  setDialogContain: (value: any) => {};
  setDialogFooter: (value: boolean) => {};
}

class AddLabel extends Component<IState> {
  state = {
    labelData: {
      name: ""
    }
  };

  constructor(props) {
    super(props);
    this.changeData = this.changeData.bind(this);
  }

  handleSave = () => {
    if (
      this.state.labelData.name === undefined ||
      this.state.labelData.name === ""
    ) {
      if (Platform.OS === "ios") {
        this.props.setDialogTitle("Opps!");
        this.props.setDialogContain(
          <DialogText>Please enter name.</DialogText>
        );
        this.props.setDialogFooter(true);
        this.props.setDialog(true);
      } else {
        Alert.alert("Opps!", "Please enter name.");
      }
    } else {
      this.props.addLabel(
        this.state.labelData,
        this.props.navigation,
        this.props.showLoader
      );
    }
  };

  changeData = (value, property) => {
    const data: any = {};
    data[property] = value;
    this.setState({ labelData: data });
  };

  render() {
    return (
      <AppContainer>
        <Container>
          {/* <PageTitle title={I18nContext.getString("labels_add")} /> */}
          <LabelInput
            valueChange={this.changeData}
            property={"name"}
            label={I18nContext.getString("labels_new")}
          />
          <ButtonContainer>
            <Button
              text={I18nContext.getString("create")}
              onPress={() => this.handleSave()}
            />
          </ButtonContainer>
        </Container>
      </AppContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    labelData: state.labelReducer.labelData
  };
};

const mapDispatchToProps = (dispatch, ownprops) => {
  return {
    addLabel: (labelData, navigation, showLoader) =>
      dispatch(addLabel(labelData, navigation, showLoader)),
    showLoader: value => dispatch(setLoader(value)),
    setDialog: value => dispatch(setDialog(value)),
    setDialogTitle: value => dispatch(setDialogTitle(value)),
    setDialogContain: value => dispatch(setDialogContain(value)),
    setDialogFooter: value => dispatch(setDialogFooter(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLabel);
