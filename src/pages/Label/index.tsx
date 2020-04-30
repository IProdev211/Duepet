import React, { Component } from "react";
import styled from "styled-components";
import SwipeList from "components/SwipeCompnentWithText";
import { AppContainer } from "styles/designSystem";
import { connect } from "react-redux";
import ThemeStyle from "styles/theme";
import { getAllLabel, setLoader } from "../../redux/actions";
import { IProps } from "store/interface";
import I18nContext from "translations/I18nContext";
import { RespScreenHeight, RespScreenWidth, FontSize } from "styles/sizes";

export const LabelWarning = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-horizontal: ${RespScreenWidth(3)};
`;

export const LabelWarningText = styled.Text`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.xxl};
  text-align: center;
`;

interface ILabel {
  labels: any;
  labelsCount: number;
}

interface IState extends IProps {
  labelData: ILabel;
  getAllLabel: any;
  showLoader: (value: boolean) => {};
}

class Label extends Component<IState> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.showLoader(false);
    this.props.getAllLabel(this.props.showLoader);
  }

  handleEdit = (item, rowMap) => {
    console.log("Press Edit");
  };

  handleRemove = (item, rowMap) => {
    console.log("Press Remove");
  };

  handleDone = (item, rowMap) => {
    console.log("Press Done");
  };

  render() {
    const SwipeListView = styled.View`
      margin-bottom: ${RespScreenHeight(13)};
    `;
    return (
      <AppContainer>
        {(this.props.labelData && this.props.labelData.labels === undefined) ||
        (this.props.labelData &&
          this.props.labelData.labels &&
          this.props.labelData.labels.length === 0) ? (
          <LabelWarning
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <LabelWarningText>
              {I18nContext.getString("no_label_warn")}
            </LabelWarningText>
          </LabelWarning>
        ) : null}
        <SwipeList
          leftSwipeValue={20}
          navigation={this.props.navigation}
          direction={"leftToRight"}
          data={this.props.labelData.labels}
          onhandleEdit={this.handleEdit}
          onhandleRemove={this.handleRemove}
          onhandleDone={this.handleDone}
        />
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
    getAllLabel: showLoader => dispatch(getAllLabel(showLoader)),
    showLoader: value => dispatch(setLoader(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Label);
