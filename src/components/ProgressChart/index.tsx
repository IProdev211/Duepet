import React, { useState } from "react";
import styled from "styled-components";
import ThemeStyle from "styles/theme";
import { FontSize, RespScreenHeight, RespScreenWidth } from "styles/sizes";
import { TrackEdit as EditIcon } from "components/Icons/TrackerEdit";
import { ProgressCircle } from "react-native-svg-charts";
import { Text, TSpan, G } from "react-native-svg";
import { TRACKER_ITEMS } from "constants/constants";

interface IProps {
  title: string;
  detail: string;
  amount: string;
  time: string;
  editable?: boolean;
  pro?: number;
  goal_oriented: boolean;
  label?: string;
}

const ProgressChartForm: React.FC<IProps> = ({
  title,
  detail,
  amount,
  time,
  editable,
  pro,
  goal_oriented,
  label
}) => {
  const [trackTitle, setTitle] = useState(title);
  const [trackDetail, setDetail] = useState(detail);
  const [trackTime, setTime] = useState(time);

  const Container = styled.View`
    flex-direction: row;
    background-color: ${ThemeStyle.backgroundLight};
    width: ${RespScreenWidth(100)};
    height: ${RespScreenHeight(22)};
    margin-top: ${RespScreenHeight(1.5)};
    padding-left: ${RespScreenWidth(10)};
    elevation: 5;
    border-color: ${ThemeStyle.backgroundDark};
    border-bottom-width: 0.3px;
  `;

  const DetailContainer = styled.View`
    flex: 0.5;
    padding-vertical: ${RespScreenHeight(2)};
  `;

  const ChartContainer = styled.View`
    flex: 0.4;
    justify-content: center;
  `;

  const EditButtonView = styled.View`
    flex: 0.1;
    padding-top: ${RespScreenHeight(1)};
    align-items: center;
  `;

  const Title = styled.Text`
    color: ${ThemeStyle.descriptionTextDark};
    font-size: ${FontSize.xl};
    font-weight: bold;
  `;

  const Detail = styled.Text`
    color: ${ThemeStyle.descriptionTextDark};
    font-size: ${FontSize.md};
    line-height: ${FontSize.xxl};
    margin-top: ${RespScreenHeight(1)};
  `;

  const Labels = () => {
    return (
      <Text
        fill="#216176"
        fontSize={17}
        fontWeight="bold"
        alignmentBaseline={"middle"}
        textAnchor={"middle"}
      >
        <TSpan x="0" y={label === "weight" ? "0" : "-5"}>
          {goal_oriented
            ? amount + (label != "weight" ? TRACKER_ITEMS[label].unit : "%")
            : amount}
        </TSpan>
        <TSpan x="0" y="15">
          {trackTime}
        </TSpan>
      </Text>
    );
  };

  return (
    <Container>
      <DetailContainer>
        <Title>{trackTitle}</Title>
        <Detail>{trackDetail}</Detail>
      </DetailContainer>
      <ChartContainer>
        <ProgressCircle
          style={{ height: 120 }}
          progress={pro}
          progressColor={"#216176"}
          startAngle={Math.PI * 1}
          endAngle={-Math.PI * 1}
          strokeWidth={20}
        >
          <Labels />
        </ProgressCircle>
      </ChartContainer>
      {editable && (
        <EditButtonView>
          <EditIcon />
        </EditButtonView>
      )}
    </Container>
  );
};

export default ProgressChartForm;
