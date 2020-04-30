import React, { Component } from "react";
import styled from "styled-components";
import { View, Platform } from "react-native";
import Swiper from "react-native-swiper";
import TrackerLineChart from "components/TrackerLineChart";
import TrackerBarChart from "components/TrackerBarChart";
import ThemeStyle from "styles/theme";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";
import I18nContext from "translations/I18nContext";

const SwiperContainer = styled(Swiper)`
  height: ${(props) =>
    Platform.OS === "android"
      ? props.goalOriented
        ? RespScreenHeight(45)
        : RespScreenHeight(70)
      : props.goalOriented
      ? RespScreenHeight(30)
      : RespScreenHeight(55)};
`;

interface IProps {
  data: Array<object>;
  goal: number;
  label: string;
  onChangeIndex: (number) => void;
  onChangeWeek: (number) => void;
  goalOriented: boolean;
  currentIndex: number;
}

export const TrackerWarning = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-horizontal: ${RespScreenWidth(3)};
  margin-top: ${RespScreenHeight(15)};
`;

export const TrackerWarningText = styled.Text`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.xxl};
  text-align: center;
`;

class ChartSwiper extends Component<IProps> {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      data,
      onChangeIndex,
      onChangeWeek,
      goalOriented,
      goal,
      label,
      currentIndex,
    } = this.props;
    return (
      <View>
        {goalOriented && (
          <SwiperContainer
            goalOriented={goalOriented}
            loop={false}
            showButtons={true}
            index={data.length - 1}
            showsPagination={false}
            onIndexChanged={(index) => {
              onChangeWeek(index);
            }}
          >
            {data.map(function(week, index) {
              let weekData = week.map((value) => value.value);
              let check = weekData.slice(0, 8).findIndex((val) => val !== 0);
              return (
                <View style={{ flex: 1 }}>
                  {check === -1 && (
                    <TrackerWarning
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                      }}
                    >
                      <TrackerWarningText>
                        {I18nContext.getString("no_tracker_log_warn")}
                      </TrackerWarningText>
                    </TrackerWarning>
                  )}
                  {check !== -1 && (
                    <TrackerLineChart
                      data={weekData}
                      label={label}
                      currentIndex={currentIndex}
                      onIndexChanged={(index) => onChangeIndex(index)}
                      goal={goal}
                    />
                  )}
                </View>
              );
            })}
          </SwiperContainer>
        )}
        {!goalOriented && (
          <SwiperContainer
            loop={false}
            showButtons={true}
            index={data.length - 1}
            showsPagination={false}
            onIndexChanged={(index) => {
              onChangeWeek(index);
            }}
          >
            {data.map((dataItem) => {
              let check1 = dataItem.map((data) => {
                let ch = data.findIndex((d) =>
                  d === undefined ? false : d.created !== ""
                );
                return ch === -1;
              });
              let check = check1.findIndex((val) => val === false);
              return (
                <View style={{ flex: 1 }}>
                  {check === -1 && (
                    <TrackerWarning
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                      }}
                    >
                      <TrackerWarningText>
                        {I18nContext.getString("no_tracker_log_warn")}
                      </TrackerWarningText>
                    </TrackerWarning>
                  )}
                  {check !== -1 && (
                    <TrackerBarChart
                      data={dataItem}
                      label={label}
                      onIndexChanged={(index) => onChangeIndex(index)}
                    />
                  )}
                </View>
              );
            })}
          </SwiperContainer>
        )}
      </View>
    );
  }
}

export default ChartSwiper;
