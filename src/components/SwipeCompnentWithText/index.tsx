import React, { Component } from "react";
import styled from "styled-components";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import ThemeStyle from "styles/theme";
import { SwipeListView } from "react-native-swipe-list-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  NavigationEvents
} from "react-navigation";
import { removeLabel, setLoader } from "../../redux/actions";
import alertService from "../../service/alertService";
import sessionService from "service/sessionService";

const SwipeListContainer = styled(View)`
  margin-horizontal: ${RespScreenWidth(2)};
  margin-bottom: ${RespScreenHeight(1)};

  &:last-child {
    margin-bottom: 0px;
  }
`;
const ReminderContainer = styled(View)`
  flex-direction: row;
  background-color: ${ThemeStyle.backgroundLight};
  height: ${RespScreenHeight(8)};
  margin-top: ${RespScreenHeight(2)};
  border-radius: ${RespScreenHeight(1.2)};
`;
const TextConatiner = styled(View)`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: auto;
  margin-left: ${RespScreenWidth(5)};
  border-bottom-color: ${ThemeStyle.commonText};
  border-bottom-width: 1px;
`;

const ReminderLabel = styled(Text)`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.xxl};
`;

const HiddenItemsView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const SwipeStyle = styled(View)`
  flex-direction: row;
  height: ${RespScreenHeight(8)};
  position: absolute;
  margin-top: ${RespScreenHeight(2)};
  /* margin: ${RespScreenHeight(0.5)} 0px; */
`;

const LeftSwipe = styled(SwipeStyle)`
  ${props => (props.direction === "rightToLeft" ? "right : 0px" : "")}
`;

const RightSwipe = styled(SwipeStyle)`
  ${props => (props.direction === "leftToRight" ? "right : 0px" : "")}
`;

const SwipeControlContainer = styled(TouchableOpacity)`
  background-color: ${ThemeStyle.backgroundLight};
  height: ${RespScreenHeight(8)};
  justify-content: center;
  align-items: center;
  border-radius: ${RespScreenHeight(1.2)};
  margin: 0px ${RespScreenHeight(0.3)};
  width: ${RespScreenWidth(17)};
`;

const SwipeText = styled(Text)`
  color: ${ThemeStyle.commonText};
  text-align: center;
  font-size: ${FontSize.sm};
`;

interface IProps {
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
  onhandleEdit?: ({}, []) => void;
  onhandleRemove?: ({}, []) => void;
  onhandleDone?: ({}, []) => void;
  direction?: string | boolean | null;
  removeLabel?: (value, showLoader) => {};
  showLoader?: (value) => {};
  leftSwipeValue?: number;
  data: {} | [];
}
class SwipeComponentWithText extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  state = {
    swipe_actions: "leftToRight"
  };
  getSwipeActionDirection = () => {
    sessionService.getStorageData("userData").then(resp => {
      if (resp && resp.token) {
        this.setState(
          {
            swipe_actions: resp.swipe_actions ? "leftToRight" : "rightToLeft"
          },
          () => {}
        );
      }
    });
  };

  onhandleEdit = (data, rowMap) => {
    this.props.navigation.navigate("EditLabel", { editLabel: data.item });
  };

  onhandleRemove = (data, rowMap) => {
    alertService
      .confirmAlert("confirm", "are you sure want to remove label?")
      .then(resp => {
        if (resp) {
          this.props.removeLabel(data.item, this.props.showLoader);
        }
      });
  };

  onhandleDone = (item, rowMap) => {
    this.props.onhandleDone(item, rowMap);
  };

  render() {
    const { swipe_actions } = this.state;
    return (
      <SwipeListContainer>
        <NavigationEvents
          onWillFocus={payload => this.getSwipeActionDirection()}
        />
        <SwipeListView
          data={this.props.data}
          renderItem={({ item }, index) => (
            <ReminderContainer key={index} bgColor={item.bgColor}>
              <TextConatiner>
                <ReminderLabel bgColor={item.bgColor}>
                  {item.label ? item.label : null}
                  {item.name ? item.name : null}
                </ReminderLabel>
              </TextConatiner>
            </ReminderContainer>
          )}
          renderHiddenItem={(item, rowMap) => (
            <HiddenItemsView>
              <LeftSwipe direction={swipe_actions}>
                <SwipeControlContainer
                  onPress={() => {
                    this.onhandleRemove(item, rowMap);
                  }}
                >
                  <SwipeText>Remove</SwipeText>
                </SwipeControlContainer>
              </LeftSwipe>
              <RightSwipe direction={swipe_actions}>
                <SwipeControlContainer
                  onPress={() => {
                    this.onhandleEdit(item, rowMap);
                  }}
                >
                  <SwipeText>Edit</SwipeText>
                </SwipeControlContainer>
              </RightSwipe>
            </HiddenItemsView>
          )}
          keyExtractor={(item: any) => item.id.toString()}
          leftOpenValue={
            swipe_actions === "leftToRight"
              ? wp(
                  this.props.leftSwipeValue
                    ? this.props.leftSwipeValue + "%"
                    : "20%"
                )
              : wp("20%")
          }
          rightOpenValue={
            swipe_actions === "leftToRight"
              ? -wp("20%")
              : -wp(
                  this.props.leftSwipeValue
                    ? this.props.leftSwipeValue + "%"
                    : "20%"
                )
          }
        />
      </SwipeListContainer>
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
    removeLabel: (value, showLoader) =>
      dispatch(removeLabel(value, showLoader)),
    showLoader: value => dispatch(setLoader(value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwipeComponentWithText);
