import React, { Component } from "react";
import { AppContainer, DialogText } from "styles/designSystem";
import PageTitle from "components/PageTitle";
import styled from "styled-components";
import I18nContext from "../../../translations/I18nContext";
import LabelInput from "components/LabelInput";
import { connect } from "react-redux";
import Button from "components/SmallButton";
import { updateLabel, setLoader, setDialog, setDialogTitle, setDialogContain, setDialogFooter } from "../../../redux/actions";
import { IProps } from "store/interface";
import { Alert, Platform, View } from "react-native";
import { RespScreenHeight } from "styles/sizes";

const Container = styled(View)`
margin-top : ${RespScreenHeight("8%")};
`

const ButtonContainer = styled(View)`
margin-top : ${RespScreenHeight("4%")};
`

interface IState extends IProps {
  labelData: Object,
  updateLabel: any;
  showLoader: (valuie: boolean) => {},
  setDialog: (value: boolean) => {};
  setDialogTitle: (value: string) => {};
  setDialogContain: (value: any) => {};
  setDialogFooter: (value: boolean) => {};
}


class UpdateLabel extends Component<IState> {
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
        this.props.setDialogContain(<DialogText>Please enter name.</DialogText>)
        this.props.setDialogFooter(true);
        this.props.setDialog(true);
      } else {
        Alert.alert("Opps!", "Please enter name.");
      }

    } else {
      const updateData = this.props.navigation.state.params.editLabel;
      updateData.name = this.state.labelData.name;
      this.props.updateLabel(updateData, this.props.navigation, this.props.showLoader);
    }
  };
  componentDidMount() {
    this.changeData(this.props.navigation.state.params.editLabel.name, "name")
  }

  changeData = (value, property) => {
    const data: any = this.props.navigation.state.params.editLabel;
    data[property] = value;
    this.setState({ labelData: data });
  };

  render() {
    return (
      <AppContainer>
        {/* <PageTitle title={I18nContext.getString("labels_edit_title")} /> */}
        <Container>
          <LabelInput
            valueChange={this.changeData} property={"name"}
            value={this.state.labelData.name}
            label={I18nContext.getString("labels_edit")}
          />
          <ButtonContainer >
            <Button text={I18nContext.getString("update")} onPress={() => this.handleSave()} />
          </ButtonContainer>
        </Container>
      </AppContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    labelData: state.labelReducer.labelData,
  };
};

const mapDispatchToProps = (dispatch, ownprops) => {
  return {
    updateLabel: (labelData, navigation, showLoader) => dispatch(updateLabel(labelData, navigation, showLoader)),
    showLoader: value => dispatch(setLoader(value)),
    setDialog: value => dispatch(setDialog(value)),
    setDialogTitle: value => dispatch(setDialogTitle(value)),
    setDialogContain: value => dispatch(setDialogContain(value)),
    setDialogFooter: value => dispatch(setDialogFooter(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLabel);;
