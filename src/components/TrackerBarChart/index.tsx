import React, { Component } from "react";
import styled from "styled-components";
import { FontSize, RespScreenWidth } from "styles/sizes";
import ThemeStyle from "styles/theme";
import { Grid, XAxis, YAxis, StackedBarChart } from "react-native-svg-charts";
import { Text, Line, G } from "react-native-svg";
import I18nContext from "translations/I18nContext";
import TrackerRatingScale from "components/TrackerRatingScale";

const Container = styled.View`
  flex: 1;
`;

const ChartContainer = styled.View`
  flex-direction: row;
  margin-left: ${RespScreenWidth(2)};
  margin-top: ${RespScreenWidth(7.5)};
`;

const BarChartContainer = styled.View`
  flex: 1;
  margin-left: 10px;
`;

const YAxisText = styled.Text`
  color: ${ThemeStyle.commonText};
  position: absolute;
  font-size: ${FontSize.sm};
  left: -${RespScreenWidth(3)};
  top: ${RespScreenWidth(6)};
`;

const ScaleView = styled.View`
  align-self: flex-end;
  top: ${RespScreenWidth(0)};
  right: ${RespScreenWidth(5)};
  width: ${RespScreenWidth(30)};
  position: absolute;
`;

const xAxisLabel = ["M", "T", "W", "T", "F", "S", "S"];
const colors = [
  "#4FBEAD",
  "#309586",
  "#176D60",
  "#115A4F",
  "#0C433A",
  "#115A4F",
  "#0C433A"
];

interface IProps {
  data: Array<object>;
  onIndexChanged: (index) => void;
}
class TrackerBarChart extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    let keys = [];
    const CustomGrid = ({ x, y, data, ticks }) => {
      return (
        <G>
          {ticks.map(tick => {
            return (
              <Line
                key={tick}
                x1="0%"
                x2="100%"
                y1={y(tick)}
                y2={y(tick)}
                stroke={tick === 0 ? "#fff" : "rgba(255, 255, 255, 0.2)"}
              />
            );
          })}
          {data.map((_, index) => (
            <Line
              key={index}
              y1={"0%"}
              y2={"100%"}
              x1={x(index)}
              x2={x(index)}
              stroke={index === 0 ? "#fff" : "rgba(255, 255, 255, 0)"}
              strokeWidth={index === 0 ? 2 : 1}
            />
          ))}
        </G>
      );
    };

    for (let k = 1; k < data[0].length; k++) keys.push(k.toString());
    const Labels = ({ x, y, bandwidth, data }) => {
      const retVal = data.map(value => {
        return Object.values(value);
      });

      const rere = retVal.map(function(value, index) {
        let tmp = 0;
        let d =
          value[0].created !== ""
            ? new Date(value[0].created).toISOString().substring(11, 16)
            : "";
        let retArr = [
          {
            y: 0,
            x: index,
            value: value[0].value,
            time: d
          }
        ];
        for (let val = 1; val < value.length; val++) {
          tmp += value[val - 1].value;
          let d1 =
            value[val].created !== ""
              ? new Date(value[val].created).toISOString().substring(11, 16)
              : "";

          retArr.push({
            time: d1,
            value: value[val].value,
            y: tmp,
            x: index
          });
        }
        return retArr;
      });

      var newArr = [];

      for (var i = 0; i < rere.length; i++) {
        newArr = newArr.concat(rere[i]);
      }
      return newArr.map((value, index) => {
        return (
          <Text
            key={index}
            x={parseInt(x(value.x) + bandwidth / 2)}
            y={y(value.y + value.value / 2)}
            fontSize={14}
            alignmentBaseline={"middle"}
            textAnchor={"middle"}
            fill="#ffffff"
          >
            {value.value !== 0 ? value.time : ""}
          </Text>
        );
      });
    };

    const axesSvg = { fontSize: 10, fill: "white" };
    const verticalContentInset = { top: 115, bottom: 43 };
    const xAxisHeight = 20;
    return (
      <Container>
        <ScaleView>
          <TrackerRatingScale />
        </ScaleView>
        <YAxisText style={{ transform: [{ rotate: "-90deg" }] }}>
          {I18nContext.getString("barchart_yaxis")}
        </YAxisText>
        <ChartContainer>
          <YAxis
            data={keys}
            style={{ marginBottom: xAxisHeight }}
            contentInset={verticalContentInset}
            svg={axesSvg}
            numberOfTicks={15}
            formatLabel={value => {
              if (Number.isInteger(value)) {
                return value;
              } else {
                return "";
              }
            }}
          />
          <BarChartContainer>
            <StackedBarChart
              style={{ height: 400 }}
              colors={colors}
              contentInset={{ top: 30, bottom: 30 }}
              data={data}
              keys={keys}
              valueAccessor={({ item, key }) => item[key].value}
            >
              <CustomGrid />
              <Labels />
            </StackedBarChart>
            <XAxis
              data={data}
              style={{ height: xAxisHeight, marginTop: -15 }}
              formatLabel={(value, index) => xAxisLabel[index]}
              contentInset={{ left: 30, right: 25 }}
              svg={axesSvg}
            />
          </BarChartContainer>
        </ChartContainer>
      </Container>
    );
  }
}

export default TrackerBarChart;
