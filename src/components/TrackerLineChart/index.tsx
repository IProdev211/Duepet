import React, { Component } from "react";
import styled from "styled-components";
import { FontSize, RespScreenWidth } from "styles/sizes";
import { AreaChart, XAxis, YAxis } from "react-native-svg-charts";
import { Circle, Path, G, Line, Text } from "react-native-svg";
import ThemeStyle from "styles/theme";
import { View } from "react-native";
import { TRACKER_ITEMS } from "constants/constants";
import I18nContext from "translations/I18nContext";

const xAxisLabel = ["", "M", "T", "W", "T", "F", "S", "S", ""];

const Container = styled.View`
  flex: 1;
`;

const ChartContainer = styled.View`
  flex-direction: column;
  margin-left: ${RespScreenWidth(2)};
`;

const LineChartContainer = styled.View`
  flex: 1;
  margin-left: 10px;
`;

interface IProps {
  goal: number;
  label: string;
  data: Array<number>;
  onIndexChanged: (index) => void;
  currentIndex: number;
}

class TrackerLineChart extends Component<IProps> {
  constructor(props) {
    super(props);

    this.state = {
      selected: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.selected !== props.currentIndex && props.currentIndex) {
      return {
        selected: props.currentIndex,
      };
    }
    return null;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)) {
      return 1;
    }

    return -1;
  }

  componentDidUpdate(prevprops, prevState, snapshot) {
    if (snapshot === 1) {
      this.setState({ selected: 0 });
    }
  }

  render() {
    const { data, goal, label } = this.props;
    const axesSvg = { fontSize: 10, fill: "white" };
    const verticalContentInset = { top: 20, bottom: 15 };
    const xAxisHeight = 20;

    const Decorator = ({ x, y, data }) => {
      return data.slice(0, data.length - 1).map((value, index) => {
        return (
          <Circle
            key={index}
            cx={x(index)}
            cy={y(value)}
            r={index === this.state.selected ? 9 : 6}
            stroke={"white"}
            strokeWidth={1}
            fill={index === this.state.selected ? "white" : "#176D60"}
            onPress={() => {
              this.setState({ selected: index });
              this.props.onIndexChanged(index);
            }}
          />
        );
      });
    };

    const CustomLine = ({ line }) => (
      <Path d={line} stroke={"white"} fill={"none"} />
    );

    const CustomGrid = ({ x, y, data, ticks }) => {
      return (
        <G>
          {ticks.map((tick) => {
            return (
              <Line
                key={tick}
                x1="0%"
                x2="90%"
                y1={y(tick)}
                y2={y(tick)}
                stroke={tick === goal ? "#fff" : "rgba(255, 255, 255, 0)"}
              />
            );
          })}
          {data.map((_, index) => (
            <Line
              key={index}
              y1={"0%"}
              y2={"95%"}
              x1={x(index)}
              x2={x(index)}
              stroke={index === 0 ? "#fff" : "rgba(255, 255, 255, 0.2)"}
              strokeWidth={index === 0 ? 2 : 1}
            />
          ))}
        </G>
      );
    };
    const numberTicks =
      goal % 1000 === 0
        ? 10
        : goal % 100 === 0
        ? 100
        : goal % 10 === 0
        ? 500
        : 2000;

    return (
      <Container>
        <ChartContainer>
          {/* <GoalText>{I18nContext.getString("goal") + "\n" + goal}</GoalText> */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 0,
            }}
          >
            <YAxis
              data={[0, goal * 1.2]}
              style={{ marginBottom: xAxisHeight }}
              contentInset={verticalContentInset}
              svg={axesSvg}
              numberOfTicks={numberTicks}
              formatLabel={(value) => {
                if (Number(value) === goal) {
                  return value + TRACKER_ITEMS[label].unit;
                } else if (Number(value) === 0) {
                  return "Goal";
                } else {
                  return "";
                }
              }}
            />
            <LineChartContainer>
              <AreaChart
                style={{ height: 250, marginRight: -40 }}
                data={data}
                yMax={goal * 1.2}
                svg={{ fill: "rgba(255, 255, 255, 0.2)" }}
                contentInset={{ top: 20, bottom: 15 }}
                numberOfTicks={numberTicks}
              >
                <CustomGrid />
                <CustomLine />
                <Decorator />
              </AreaChart>
              <XAxis
                data={data}
                style={{ height: xAxisHeight }}
                formatLabel={(value, index) => xAxisLabel[index]}
                contentInset={{ left: 0, right: -40 }}
                svg={axesSvg}
              />
            </LineChartContainer>
          </View>
        </ChartContainer>
      </Container>
    );
  }
}

export default TrackerLineChart;
