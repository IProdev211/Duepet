import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { NavigationScreenProp } from "react-navigation";
import I18nContext from "translations/I18nContext";
import ThemeStyle from "styles/theme";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";
import PageTitle from "components/PageTitle";
import TrackerData from "mock-data/tracker-data";
import PetData from "mock-data/pet-data";

import { AnimatedCircularProgress as Progress } from "react-native-circular-progress";
import { AppContainer } from "styles/designSystem";

const ContentContainer = styled.ScrollView`
  width: 100%;
  padding: ${RespScreenHeight(1.5)} 0;
`;

const PetImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const PetDetailsContainer = styled.View`
  width: 100%;
  padding: ${RespScreenWidth(4)};
`;
const PetImageWrapper = styled.View`
  width: ${RespScreenWidth(28)};
  height: ${RespScreenWidth(28)};
  margin: 0 auto;
`;

const PetName = styled.Text`
  color: ${ThemeStyle.commonText};
  margin-top: ${RespScreenHeight(1)};
  text-align: center;
  font-size: ${FontSize.lg};
`;

const PetStats = styled.View`
  flex-direction: row;
  width: ${RespScreenWidth(70)};
  margin: 0 auto;
`;

const PetsStatWrapper = styled.View`
  width: 50%;
`;

const GoalStatTypeLabel = styled.Text`
  font-size: ${FontSize.md};
  color: ${ThemeStyle.commonText};
  text-align: center;
`;
const GoalStatValueLabel = styled.Text`
  font-size: ${FontSize.xl};
  font-weight: 700;
  text-align: center;
  margin-top: ${RespScreenHeight(0.5)};
  color: ${ThemeStyle.commonText};
`;

const PreviousGoalDateValue = styled.Text`
  font-size: ${FontSize.sm};
  color: ${ThemeStyle.commonText};
  text-align: center;
`;

const TrackerDataContainer = styled.View`
  width: 100%;
  padding: ${RespScreenWidth(4)} ${RespScreenWidth(10)};
  flex-direction: row;
  margin-top: ${RespScreenHeight(3)};
  background-color: ${ThemeStyle.backgroundLight};
  shadow-color: #000;
  shadow-offset: 1px 0.5px;
  shadow-opacity: 0.075;
  shadow-radius: 2px;
  elevation: 3;
`;

const TrackerInfoContainer = styled.View`
  width: 50%;
  justify-content: center;
`;

const ProgressTrackerInfoContainer = styled(TrackerInfoContainer)`
  justify-content: center;
  align-items: center;
`;

const ProgressTrackerInnerContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const TrackerNameLabel = styled.Text`
  font-size: ${FontSize.xl};
  color: ${ThemeStyle.descriptionTextDark};
  margin-bottom: ${RespScreenHeight(1)};
  font-weight: 700;
`;
const TrackerGoalInfo = styled.Text`
  font-size: ${FontSize.sm};
  color: ${ThemeStyle.descriptionTextDark};
  line-height: ${RespScreenHeight(2.5)};
`;

const TrackerQuantityValue = styled.Text`
  font-size: ${FontSize.lg};
  color: ${ThemeStyle.descriptionTextDark};
  font-weight: 700;
  text-align: center;
`;

const LogInputContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const LogLabel = styled.Text`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.lg};
`;

const LogTextInputContainer = styled.View`
  border-bottom-width: 1;
  color: ${ThemeStyle.commonText};
  border-color: #fff;
  width: ${RespScreenWidth(10)};
`;

const LogTextInput = styled.TextInput`
  border: none;
  color: ${ThemeStyle.commonText};
  padding: ${RespScreenWidth(1)};
`;

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}
const SingleTracker = ({ navigation }) => {
  const [trackerData, setTrackerData] = useState(null);
  const [petData, setPetData] = useState(null);

  useEffect(() => {
    const petID = navigation.getParam("petID");
    const trackerName = navigation.getParam("trackerName") || "food";
    const trackerData = TrackerData.find(
      data => data.petID === petID
    ).trackerData.find(tracker => tracker.trackerName === trackerName);
    const petData = PetData.find(data => data.id === petID);

    setPetData(petData);
    setTrackerData(trackerData);
  });

  const trackerDataVal = trackerData ? trackerData : {};
  return (
    <AppContainer>
      <PageTitle
        title={""}
        backAction={navigation.goBack}
        backTitle={petData ? `Trackers ${petData.name}` : "Trackers"}
      />
      <ContentContainer>
        <PetDetailsContainer>
          <PetImageWrapper>
            <PetImage
              source={petData ? petData.image : null}
              imageStyle={{
                borderRadius: wp(30 / 2),
                backgroundColor: "rgba(200, 200, 200, 0.8)"
              }}
            />
          </PetImageWrapper>
          <PetName>{petData && petData.name}</PetName>
        </PetDetailsContainer>
        <PetStats>
          <PetsStatWrapper>
            <GoalStatTypeLabel>Previous</GoalStatTypeLabel>
            <GoalStatValueLabel>
              {trackerDataVal.quantity - 2} {trackerDataVal.unit}
            </GoalStatValueLabel>
            <PreviousGoalDateValue>6th Jan</PreviousGoalDateValue>
          </PetsStatWrapper>

          <PetsStatWrapper>
            <GoalStatTypeLabel>Goal</GoalStatTypeLabel>
            <GoalStatValueLabel>
              {trackerDataVal.quantity} {trackerDataVal.unit}
            </GoalStatValueLabel>
          </PetsStatWrapper>
        </PetStats>
        <TrackerDataContainer>
          <TrackerInfoContainer>
            <TrackerNameLabel>{trackerDataVal.trackerName}</TrackerNameLabel>
            <TrackerGoalInfo>
              Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit Sed Do
            </TrackerGoalInfo>
          </TrackerInfoContainer>
          <ProgressTrackerInfoContainer>
            <Progress
              size={120}
              width={10}
              fill={70}
              tintColor={ThemeStyle.descriptionTextDark}
              lineCap="round"
              backgroundColor="#FFF"
            >
              {() => {
                return (
                  <ProgressTrackerInnerContainer>
                    <TrackerQuantityValue>
                      {trackerDataVal.quantity} {trackerDataVal.unit}
                    </TrackerQuantityValue>
                    <TrackerQuantityValue>Today</TrackerQuantityValue>
                  </ProgressTrackerInnerContainer>
                );
              }}
            </Progress>
          </ProgressTrackerInfoContainer>
        </TrackerDataContainer>
        <LogInputContainer>
          <LogLabel>
            {trackerDataVal.trackerName} {trackerDataVal.unit}
          </LogLabel>
          <LogTextInputContainer>
            <LogTextInput value={trackerDataVal.quantity} />
          </LogTextInputContainer>
        </LogInputContainer>
      </ContentContainer>
    </AppContainer>
  );
};

export default SingleTracker;
