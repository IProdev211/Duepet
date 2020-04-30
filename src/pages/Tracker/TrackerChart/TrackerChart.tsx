import React, { Component } from "react";
import { AppContainer } from "styles/designSystem";
import {
  Text,
  Dimensions,
  Alert,
  View,
  SafeAreaView,
  StatusBar,
} from "react-native";
import I18nContext from "translations/I18nContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import Carousel from "react-native-snap-carousel";
import PetTrackInfo from "components/PetTrackerInfo";
import ProgressChart from "components/ProgressChart";
import ChartSwiper from "components/ChartSwiper";
import { NavigationEvents } from "react-navigation";
import _ from "lodash";
import {
  ImageContainer,
  PetImage,
  MenuListContainer,
  MenuItemText,
  DropDownListContainer,
  ScrollViewContainer,
  DescriptionContainer,
  CarouselContainer,
  DescriptionTitle,
  Description,
  PetNameText,
  ChartTitleText,
  PetContainer,
  ChartSpace,
} from "./TrackerChart.style";
import PageTitle from "components/PageTitle";
import PresentLoader from "components/DpActivityIndicator";
import { TrackInfoContainer } from "../GoalOrientedLog/GoalOrientedLog.style";
import moment from "moment";

interface IProps {
  petData: Array<any>;
  navigation: any;
  deleteTracker: any;
  showLoader: (value) => {};
}

interface IState {
  selectedPet: number;
  data: Array<any>;
  currentWeekIndex: number;
  total_log: any;
  currentDayIndex: number;
  trackerData: Array<any>;
  trackerLogs: Array<any>;
  currentBlockIndex: number;
  switch: boolean;
}

const colors = ["#4FBEAD", "#309586", "#176D60", "#115A4F", "#0C433A"];
class TrackerChart extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this._carousel = null;

    const params = props.navigation.state.params || {};
    this.state = {
      selectedPet: 0,
      currentWeekIndex: -1,
      currentDayIndex: 0,
      currentBlockIndex: 1,
      data: [],
      trackerData: params.trackerData,
      total_log: 0,
      trackerLogs: [],
      switch: false,
      total_log_date: null,
    };
  }

  _renderItem = ({ item, index }) => {
    return (
      <View>
        {JSON.stringify(item) === JSON.stringify({}) && <View />}
        {JSON.stringify(item) !== JSON.stringify({}) && (
          <DescriptionContainer>
            <DescriptionTitle>
              <Text>{item.created.substring(0, 16).replace("T", " ")}</Text>
            </DescriptionTitle>
            <Description>
              <Text>{item.note}</Text>
            </Description>
          </DescriptionContainer>
        )}
      </View>
    );
  };

  static navigationOptions = {
    headerShown: false,
  };

  static getDerivedStateFromProps(props, state) {
    const params = props.navigation.state.params || {};
    if (
      JSON.stringify(params.trackerData) !== JSON.stringify(state.trackerData)
    ) {
      return {
        trackerData: params.trackerData,
      };
    }
    return null;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const params = this.props.navigation.state.params || {};
    if (
      JSON.stringify(params.trackerData) !==
      JSON.stringify(prevState.trackerData)
    ) {
      return 1;
    }
    if (this.state.currentBlockIndex !== prevState.currentBlockIndex) {
      return 4;
    }
    if (this.state.currentDayIndex !== prevState.currentDayIndex) {
      return 2;
    }
    if (this.state.currentWeekIndex !== prevState.currentWeekIndex) {
      return 3;
    }
    return -1;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const params = this.props.navigation.state.params || {};
    if (snapshot === 1) {
      this.setState({ trackerData: { ...params.trackerData } });
      this.prepareData();
      this.calculateValue();
    } else if (snapshot === 2 || snapshot === 4) {
      if (!params.goalOriented) {
        const {
          currentWeekIndex,
          currentDayIndex,
          currentBlockIndex,
          data,
        } = this.state;
        if (prevState.currentWeekIndex !== -1) {
          let beforeData =
            data[prevState.currentWeekIndex][prevState.currentDayIndex][
              prevState.currentBlockIndex
            ];
          if (beforeData)
            data[prevState.currentWeekIndex][prevState.currentDayIndex][
              prevState.currentBlockIndex
            ].svg = {
              ...beforeData.svg,
              stroke: colors[beforeData.rating - 1],
              strokeWidth: 1,
            };
        }
        let currentSvg =
          data[currentWeekIndex][currentDayIndex][currentBlockIndex].svg;

        data[currentWeekIndex][currentDayIndex][currentBlockIndex].svg = {
          ...currentSvg,
          stroke: "white",
          strokeWidth: 2,
        };
        this.setState({ data: data });
      }
    } else if (snapshot === 3) {
      if (!params.goalOriented) {
        const { data } = this.state;

        let weekData = this.state.data[this.state.currentWeekIndex];

        if (prevState.currentWeekIndex !== -1) {
          let beforeData =
            data[prevState.currentWeekIndex][prevState.currentDayIndex][
              prevState.currentBlockIndex
            ];
          if (beforeData)
            data[prevState.currentWeekIndex][prevState.currentDayIndex][
              prevState.currentBlockIndex
            ].svg = {
              ...beforeData.svg,
              stroke: colors[beforeData.rating - 1],
              strokeWidth: 1,
            };
        }
        if (weekData.length > 0) {
          for (let i = weekData.length - 1; i >= 0; i--) {
            if (weekData[i][1].created !== "") {
              this.setState(
                () => ({
                  currentDayIndex: i,
                  currentBlockIndex: 1,
                }),
                () => this._carousel.snapToItem(0)
              );

              data[this.state.currentWeekIndex][i][1].svg = {
                ...data[this.state.currentWeekIndex][i][1].svg,
                stroke: "white",
                strokeWidth: 2,
              };
              break;
            }
          }
        }
        this.setState({ data: data });
      }
    }
    return null;
  }

  onWillFocus = (payload) => {
    this.prepareData();
    this.calculateValue();
  };

  calculateValue = () => {
    const params = this.props.navigation.state.params || {};
    if (params.trackerData.values) {
      let today = new Date();
      let today_values = params.trackerData.values.filter((value) => {
        let d = new Date(value.created);
        return (
          d.toISOString().substring(0, 10) ===
          today.toISOString().substring(0, 10)
        );
      });
      if (params.label === "weight") {
        if (today_values && today_values.length > 0) {
          this.setState({
            total_log: today_values[today_values.length - 1].value,
            total_log_date: today_values[today_values.length - 1].created,
          });
        }
      } else {
        const total_log = today_values
          .map((val) => val.value)
          .reduce(function(a, b) {
            return a + b;
          }, 0);
        this.setState({ total_log });
      }
    }
  };

  handleClickBlock = (blockIndex, dayIndex) => {
    this.setState({
      currentDayIndex: dayIndex,
      currentBlockIndex: blockIndex + 1,
    });
    this._carousel.snapToItem(blockIndex);
  };

  prepareData = () => {
    const params = this.props.navigation.state.params || {};
    const { trackerData } = this.state;
    let trackDataArray = [];
    const trackValues: any = trackerData.values || [];
    let startDay = new Date();
    let today = new Date();
    startDay.setDate(today.getDate() - today.getDay() + 1);
    startDay.setUTCHours(0);
    startDay.setUTCMinutes(0);
    startDay.setUTCSeconds(0);
    let _endDay = new Date(trackerData.created);
    let endDay = new Date(_endDay.getTime() - 7 * 24 * 60 * 60 * 1000);
    let trackerLogs = [];
    while (startDay > endDay) {
      let arr = [];
      let counter = 0;
      let note_array = [];
      for (let i = 0; i < 7; i++) {
        let date = new Date(startDay.getTime() + i * 24 * 60 * 60 * 1000);
        let weekDays = trackValues.filter((value) => {
          let d = new Date(value.created);
          return (
            d.toISOString().substring(0, 10) ===
            date.toISOString().substring(0, 10)
          );
        });
        note_array.push(
          weekDays.map((day) => {
            let d = new Date(day.created);
            let created = d.toISOString();
            return { created: created, note: day.note };
          })
        );
        if (params.goalOriented == true) {
          let dayTotal = 0;
          if (params.label === "weight") {
            if (weekDays.length > 0) {
              dayTotal = weekDays[weekDays.length - 1].value;
            }
          } else {
            dayTotal = weekDays
              .map((val) => val.value)
              .reduce(function(a, b) {
                return a + b;
              }, 0);
          }

          let created =
            weekDays.length > 0 ? weekDays[weekDays.length - 1].created : "";
          if (created !== "") {
            let d = new Date(created);
            created = d.toISOString();
          }

          arr.push({
            value: dayTotal ? dayTotal : 0,
            created,
            index: created === "" ? -1 : counter,
          });
          if (created !== "") {
            counter += 1;
          }
        } else {
          let blocks = [];
          for (let j = 0; j < 12; j++) {
            if (weekDays[j]) {
              blocks[j + 1] = {
                value: 200,
                created: weekDays[j].created,
                index: j,
                rating: weekDays[j].rating,
                svg: {
                  fill: colors[weekDays[j].rating - 1],
                  stroke: colors[weekDays[j].rating - 1],
                  strokeWidth: 1,
                  fillOpacity: "1",
                  onPress: () => this.handleClickBlock(j, i),
                },
              };
              counter += 1;
            } else {
              blocks[j + 1] = {
                value: 200,
                created: "",
                svg: {
                  fillOpacity: "0",
                },
              };
            }
          }
          arr.push(blocks);
        }
      }
      trackerLogs.unshift(note_array);
      if (params.goalOriented) {
        arr.push({ value: params.goal, created: "" });
        arr.unshift({ value: 0, created: "" });
      }

      trackDataArray.unshift(arr);
      startDay.setDate(startDay.getDate() - 7);
    }
    if (!params.goalOriented) {
      trackDataArray[trackDataArray.length - 1][
        this.state.currentDayIndex
      ][1].svg = {
        ...trackDataArray[trackDataArray.length - 1][
          this.state.currentDayIndex
        ][1].svg,
        strokeWidth: 2,
        stroke: "white",
      };
      this._carousel.snapToItem(0);
    }
    this.setState({
      data: trackDataArray,
      currentWeekIndex: trackDataArray.length - 1,
      trackerLogs: trackerLogs,
    });
  };

  changeDayIndex = (index) => {
    const params = this.props.navigation.state.params || {};
    if (params.goalOriented) {
      this.setState({ currentDayIndex: index });
      setTimeout(() => {
        this._carousel.snapToItem(1, false);
      }, 250);
    }
  };

  render() {
    const { petData, navigation, deleteTracker } = this.props;
    const {
      data,
      currentWeekIndex,
      total_log,
      trackerLogs,
      currentDayIndex,
      total_log_date,
    } = this.state;
    const params = navigation.state.params || {};
    const last_value = params.last ? params.last.value : "0";
    const width = Dimensions.get("window").width;
    let barChartData = [];
    let percentage;
    if (params.label === "weight") {
      if (total_log > params.goal) {
        percentage = 100;
      } else {
        percentage = Math.round((total_log * 100) / params.goal);
      }
    }
    if (data.length !== 0) {
      if (!params.goalOriented) {
        for (let i = 0; i < data[currentWeekIndex].length; i++) {
          barChartData = barChartData.concat(data[currentWeekIndex][i]);
        }
        barChartData = _.filter(barChartData, (data) => data !== undefined);
        barChartData = _.filter(
          barChartData,
          (data) => data.created !== "" && data.created !== undefined
        );
        barChartData = _.map(barChartData, (data) => {
          let d = new Date(data.created);
          let created = d.toISOString();
          return {
            ...data,
            created: created,
          };
        });
      }
    }

    let render_trackerLogs = JSON.parse(JSON.stringify(trackerLogs));
    for (let i = 0; i < trackerLogs.length; i++) {
      for (let j = 0; j < trackerLogs[i].length; j++) {
        render_trackerLogs[i][j].push({});
        render_trackerLogs[i][j].unshift({});
      }
    }

    return (
      <AppContainer>
        <NavigationEvents
          onWillFocus={(payload) => this.onWillFocus(payload)}
        />
        <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
          <PageTitle title={I18nContext.getString("duepet")} />
        </SafeAreaView>
        <MenuListContainer>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Clear Chart",
                "Are you going to clear this chart?",
                [
                  {
                    text: "cancel",
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      deleteTracker({
                        label: params.label,
                        trackerId: params.trackerId,
                        petId: params.trackerData.pet.id,
                        navigation: navigation,
                        showLoader: this.props.showLoader,
                      });
                      if (params.goalOriented === true) {
                        let data = this.state.data;
                        let retData = data[this.state.currentWeekIndex].map(
                          (val) => {
                            return {
                              ...val,
                              value: 0,
                              created: "",
                            };
                          }
                        );
                        data[this.state.currentWeekIndex] = retData;
                        this.setState({ data });
                      } else {
                        let data = this.state.data;
                        let retData = data[this.state.currentWeekIndex].map(
                          (val) =>
                            val.map((v) => {
                              return {
                                ...v,
                                value: 0,
                                created: "",
                              };
                            })
                        );
                        data[this.state.currentWeekIndex] = retData;
                        this.setState({ data });
                      }
                    },
                  },
                ],
                {
                  cancelable: false,
                }
              );
            }}
          >
            <MenuItemText>{I18nContext.getString("chart_clear")}</MenuItemText>
          </TouchableOpacity>
          <TouchableOpacity>
            <MenuItemText>{I18nContext.getString("chart_share")}</MenuItemText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (params.goalOriented) {
                this.props.navigation.navigate("GoalOrientedLog", {
                  petId: params.trackerData.pet.id,
                  trackerId: params.trackerData.id,
                  label: params.label,
                  goal_value: params.goal,
                  last: params.trackerData.last_total,
                  goal_oriented: true,
                  values: params.trackerData.values,
                });
              } else {
                this.props.navigation.navigate("TrackLog", {
                  petId: params.trackerData.pet.id,
                  trackerId: params.trackerData.id,
                  label: params.label,
                  goal_value: params.goal,
                  last: params.trackerData.last_total,
                });
              }
            }}
          >
            <MenuItemText>{I18nContext.getString("chart_update")}</MenuItemText>
          </TouchableOpacity>
        </MenuListContainer>

        <ScrollViewContainer>
          <PetContainer>
            <View style={{ flex: 3 }}>
              <ImageContainer>
                <PetImage source={{ uri: params.trackerData.pet.avatar }} />
              </ImageContainer>
              <DropDownListContainer>
                <PetNameText>{params.trackerData.pet.name}</PetNameText>
              </DropDownListContainer>
            </View>
            <ChartTitleText>
              {I18nContext.getString("tracker_title_" + params.label) +
                "\n" +
                I18nContext.getString("tracker")}
            </ChartTitleText>
          </PetContainer>
          {params && params.goalOriented ? (
            <ChartSpace>
              <TrackInfoContainer>
                <PetTrackInfo
                  time={I18nContext.getString("last")}
                  label={params.label}
                  amount={total_log.toString()}
                  date={
                    total_log_date
                      ? moment(new Date(total_log_date)).format("Do MMMM")
                      : ""
                  }
                />
                <PetTrackInfo
                  time={I18nContext.getString("goal")}
                  amount={params.goal}
                  date=""
                  label={params.label}
                />
              </TrackInfoContainer>
              <ProgressChart
                title={I18nContext.getString("tracker_title_" + params.label)}
                detail="Lorem ipsum dolor sitamet, consectetur aipisigin elit, set do"
                amount={
                  params.label === "weight"
                    ? percentage.toString()
                    : total_log.toString()
                }
                pro={
                  params.label === "weight"
                    ? percentage / 100
                    : total_log / params.goal
                }
                time={params.label === "weight" ? "" : "Today"}
                label={params.label}
                goal_oriented={true}
              />
            </ChartSpace>
          ) : (
            <ChartSpace>
              <ProgressChart
                title={I18nContext.getString("tracker_title_" + params.label)}
                detail="Lorem ipsum dolor sitamet, consectetur aipisigin elit, set do"
                amount={last_value + "X"}
                time={I18nContext.getString("today")}
                goal_oriented={false}
                pro={100}
              />
            </ChartSpace>
          )}
          <ChartSwiper
            data={data}
            label={params.label}
            currentIndex={this.state.currentDayIndex}
            goal={parseInt(params.goal)}
            goalOriented={params.goalOriented}
            onChangeIndex={(index) => {
              this.changeDayIndex(index);
            }}
            onChangeWeek={(index) => this.setState({ currentWeekIndex: index })}
          />
          <CarouselContainer>
            <Carousel
              ref={(c) => {
                this._carousel = c;
              }}
              initialNumToRender={1}
              data={
                trackerLogs.length > 0
                  ? params.goalOriented
                    ? render_trackerLogs[currentWeekIndex][currentDayIndex - 1]
                    : trackerLogs[currentWeekIndex][currentDayIndex]
                  : []
              }
              renderItem={this._renderItem}
              sliderWidth={width - 17}
              itemWidth={200}
              firstItem={1}
              onSnapToItem={(index) => {
                if (!params.goalOriented) {
                  this.setState({
                    currentBlockIndex: index + 1,
                  });
                } else {
                  if (index === 0 && currentDayIndex !== 1) {
                    this.setState(
                      { currentDayIndex: currentDayIndex - 1 },
                      () => {
                        this._carousel.snapToItem(1);
                      }
                    );
                  } else if (
                    index ===
                      render_trackerLogs[currentWeekIndex][currentDayIndex - 1]
                        .length -
                        1 &&
                    currentDayIndex !== 7
                  ) {
                    this.setState(
                      { currentDayIndex: currentDayIndex + 1 },
                      () => {
                        this._carousel.snapToItem(1);
                      }
                    );
                  }
                }
              }}
            />
          </CarouselContainer>
        </ScrollViewContainer>
        <PresentLoader />
      </AppContainer>
    );
  }
}
export default TrackerChart;
