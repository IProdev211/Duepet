import React, { Component } from "react";
import styled from "styled-components";
import { View, Text, Image } from "react-native";
import { NavigationScreenProp, NavigationEvents } from "react-navigation";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import ThemeStyle from "styles/theme";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import {
  TouchableOpacity,
  TouchableHighlight,
  FlatList
} from "react-native-gesture-handler";
import { YellowBox } from "react-native";
import DoubleTap from "react-native-double-tap";
import { TRACKER_ITEMS } from "constants/constants";
import sessionService from "service/sessionService";
import I18nContext from "translations/I18nContext";

YellowBox.ignoreWarnings([
  "VirtualizedLists should never be nested" // TODO: Remove when fixed
]);
const SwipeListContainer = styled(View)`
  margin: 0px;
  margin-bottom: ${RespScreenHeight(1)};
  &:last-child {
    margin-bottom: 0px;
  }
`;
const ReminderContainer = styled(View)`
  align-items: center;
  justify-content: center;
  background-color: ${ThemeStyle.backgroundLight};
  height: ${RespScreenHeight(8)};
  margin: 0px;
  border-radius: ${RespScreenHeight(1.2)};
  padding-horizontal: ${RespScreenWidth(5)};
`;

const TrackerItemsContainer = styled(View)`
  width: 100%;
  height: 80%;
  flex-direction: row;
  border-bottom-color: ${ThemeStyle.commonText};
  border-bottom-width: 1px;
`;

const TextContainer = styled.View`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: auto;
  flex-direction: row;
  flex: 1;
`;

const TrackerLabel = styled.Text`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.lg};
  width: ${RespScreenWidth(20)};
`;

const TrackerGoalLabel = styled.Text`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.lg};
  width: ${RespScreenWidth(25)};
  margin-left: ${RespScreenWidth(2)};
`;

const TrackerQuantityLabel = styled.Text`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.lg};
  width: ${RespScreenWidth(20)};
  margin-left: ${RespScreenWidth(2)};
`;

const TrackerIconContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: ${RespScreenWidth(10)};
  image {
    max-width: 100%;
  }
`;

const HiddenItemsView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const SwipeStyle = styled(View)`
  flex-direction: row;
  height: ${RespScreenHeight(8)};
  position: absolute;
  /* margin: ${RespScreenHeight(0.5)} 0px; */
`;

const LeftSwipe = styled(SwipeStyle)`
  ${props => (props.direction === "rightToLeft" ? "right : 0px" : "")}
`;

const RightSwipe = styled(SwipeStyle)`
  ${props => (props.direction === "leftToRight" ? "right : 0px" : "")}
`;

const SwipeControlContainer = styled(TouchableHighlight)`
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
  onhandleEdit?: () => void;
  onhandleRemove?: (number) => void;
  onhandleDone?: () => void;
  direction?: string | boolean | null;
  data: {} | [];
  goal_oriented?: boolean;
  navigation?: NavigationScreenProp<any, any>;
  currentPetId: number;
  label: string;
  goal: string;
  last: object;
  previous: object;
  trackerId: number;
}

class SwipeComponentWithText extends Component<IProps> {
  constructor(props) {
    super(props);

    this.state = {
      swipe_actions: "leftToRight"
    };
  }

  getSwipeActionDirection = () => {
    sessionService.getStorageData("userData").then(resp => {
      if (resp && resp.token) {
        const value = resp.swipe_actions ? "leftToRight" : "rightToLeft";
        const { swipe_actions } = this.state;
        if (swipe_actions === value) return;

        this.setState(
          {
            swipe_actions: resp.swipe_actions ? "leftToRight" : "rightToLeft"
          },
          () => {}
        );
      }
    });
  };

  componentDidMount() {
    this.getSwipeActionDirection();
  }

  onhandleEdit = (item, rowMap) => {
    this.props.onhandleEdit();
  };

  onhandleRemove = (item, rowMap) => {
    this.props.onhandleRemove(item.id);
  };

  onhandleDone = (item, rowMap) => {
    this.props.onhandleDone();
  };

  swipeAction = (rowkey, direction?) => {};

  render() {
    const {
      label,
      data,
      currentPetId,
      navigation,
      goal,
      last,
      previous,
      goal_oriented,
      trackerId
    } = this.props;
    const { swipe_actions } = this.state;
    const listData = [
      {
        id: trackerId,
        goal: goal,
        last: last,
        previous: previous
      }
    ];
    return (
      <SwipeListContainer>
        <NavigationEvents
          onWillFocus={payload => this.getSwipeActionDirection()}
        />
        <FlatList
          data={listData}
          renderItem={({ item, index }) => (
            <SwipeRow
              leftOpenValue={
                swipe_actions === "leftToRight"
                  ? wp(18.5)
                  : goal_oriented
                  ? wp(18.5) * 2
                  : wp(18.5)
              }
              rightOpenValue={
                swipe_actions === "leftToRight"
                  ? goal_oriented
                    ? -wp(18.5) * 2
                    : -wp(18.5)
                  : -wp(18.5)
              }
            >
              <HiddenItemsView>
                <LeftSwipe direction={swipe_actions}>
                  <SwipeControlContainer
                    underlayColor={ThemeStyle.backgroundLight}
                    onPress={() => {
                      this.onhandleRemove(item, index);
                    }}
                  >
                    <SwipeText>Remove</SwipeText>
                  </SwipeControlContainer>
                </LeftSwipe>
                <RightSwipe direction={swipe_actions}>
                  {goal_oriented ? (
                    <SwipeControlContainer
                      underlayColor={ThemeStyle.backgroundLight}
                      onPress={() => {
                        this.onhandleEdit(item, index);
                      }}
                    >
                      <SwipeText>
                        {I18nContext.getString("edit_goal")}
                      </SwipeText>
                    </SwipeControlContainer>
                  ) : null}
                  <SwipeControlContainer
                    underlayColor={ThemeStyle.backgroundLight}
                    onPress={() => {
                      this.onhandleDone(item, index);
                    }}
                  >
                    <SwipeText>{I18nContext.getString("view_chart")}</SwipeText>
                  </SwipeControlContainer>
                </RightSwipe>
              </HiddenItemsView>
              <ReminderContainer>
                <TrackerItemsContainer>
                  <TextContainer>
                    <TrackerLabel>{label}</TrackerLabel>
                    <TrackerQuantityLabel>
                      {item.last
                        ? item.last.value < 10
                          ? "0" + item.last.value.toString()
                          : item.last.value.toString()
                        : "00"}
                    </TrackerQuantityLabel>
                    {goal_oriented && (
                      <TrackerGoalLabel>
                        {item.goal + " " + TRACKER_ITEMS[label].unit}
                      </TrackerGoalLabel>
                    )}
                  </TextContainer>
                  <TrackerIconContainer>
                    <Image source={TRACKER_ITEMS[label].icon} />
                  </TrackerIconContainer>
                </TrackerItemsContainer>
              </ReminderContainer>
            </SwipeRow>
          )}
          keyExtractor={(item: any) => item.id.toString()}
        />
      </SwipeListContainer>
    );
  }
}

export default SwipeComponentWithText;
