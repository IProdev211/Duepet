import * as React from "react";
import styled from "styled-components";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";
import ThemeStyle from "styles/theme";
import { SwipeListView } from "react-native-swipe-list-view";
import moment from "moment";
import sessionService from "service/sessionService";
import { NavigationEvents } from "react-navigation";

const ReminderContainer = styled(View)`
flex-direction:row;
background-color : ${ThemeStyle.backgroundLight}
height : ${hp("8%") + "px"}
margin-top : ${hp("0.5%") + "px"}
margin-bottom : ${hp("0.5%") + "px"}
border-radius : ${hp("1.2%") + "px"}
`;
const TextConatiner = styled(View)`
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: ${wp("5%") + "px"};
`;

const ReminderLabel = styled(Text)`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.lg};
  margin-left: auto;
`;

const ReminderTime = styled(Text)`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.lg};
  margin-left: auto;
`;

const SwipeStyle = styled(View)`
  flex-direction: row;
  height: ${hp("8%") + "px"};
  position: absolute;
  margin-top: ${hp("0.5%") + "px"};
  margin-bottom: ${hp("0.5%") + "px"};
`;

const LeftSwipe = styled(SwipeStyle)`
  ${props => (props.direction === "rightToLeft" ? "right : 0px" : "")}
`;
const ScheduleImage = styled(Image)`
width: ${RespScreenHeight(7)};
height: ${RespScreenHeight(7)};
border-radius : ${RespScreenWidth(50)}
margin-left : ${RespScreenWidth(3)}
margin-top :auto;
margin-bottom : auto;
`;
const RightSwipe = styled(SwipeStyle)`
  ${props => (props.direction === "leftToRight" ? "right : 0px" : "")}
`;

const SwipeContainer = styled(TouchableOpacity)`
background-color : ${ThemeStyle.backgroundLight};
height : ${hp("8%") + "px"}
border-radius : ${hp("1.2%") + "px"};
margin-left: ${hp("1%") + "px"};
margin-right: ${hp("1%") + "px"};
width : ${wp("17%") + "px"};
text-align : center;
`;

const SwipeText = styled(Text)`
  color: ${ThemeStyle.commonText};
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
`;

interface IReminderState {
  reminderData: Array<any>;
  showActionSheet: any;
  editReminderTemplate: any;
  daneReminder: any;
  slice?: number;
}

class Reminders extends React.Component<IReminderState> {
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
  render() {
    return (
      <View>
        <NavigationEvents
          onWillFocus={payload => this.getSwipeActionDirection()}
        />
        <SwipeListView
          data={this.props.reminderData}
          renderItem={({ item, index }) =>
            index <= this.props.slice ? (
              <ReminderContainer key={item.id} bgColor={item.bgColor}>
                <ScheduleImage source={{ uri: item.pet_avatar }} />
                <TextConatiner>
                  <ReminderLabel bgColor={item.bgColor}>
                    {item.reminder_title} {item.label_name}
                  </ReminderLabel>
                  <ReminderTime bgColor={item.bgColor}>
                    {moment(new Date(item.value)).format(
                      "Do MMMM YYYY, h:mm a"
                    )}
                  </ReminderTime>
                </TextConatiner>
              </ReminderContainer>
            ) : (
              <></>
            )
          }
          renderHiddenItem={({ item, index }) => (
            <View>
              <LeftSwipe direction={this.state.swipe_actions}>
                {/* <SwipeContainer onPress={() => editReminderTemplate(item)}>
                                <SwipeText>Edit</SwipeText>
                            </SwipeContainer> */}
                <SwipeContainer
                  onPress={() => this.props.showActionSheet(item)}
                >
                  <SwipeText>Remove</SwipeText>
                </SwipeContainer>
              </LeftSwipe>
              <RightSwipe direction={this.state.swipe_actions}>
                <SwipeContainer onPress={() => this.props.daneReminder(item)}>
                  <SwipeText>Done</SwipeText>
                </SwipeContainer>
              </RightSwipe>
            </View>
          )}
          keyExtractor={(item: any) => item.id}
          leftOpenValue={
            this.state.swipe_actions === "leftToRight" ? wp("20%") : wp("20%")
          }
          rightOpenValue={
            this.state.swipe_actions === "leftToRight" ? -wp("20%") : -wp("20%")
          }
        />
      </View>
    );
  }
}

export default Reminders;
