import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ThemeStyle from "styles/theme";
import { FontSize, RespScreenWidth } from "styles/sizes";
import { TRACKER_ITEMS } from "../../constants/constants";

interface IProps {
  time: string;
  amount?: string;
  date: string;
  label: string;
}

const PetTrackerInfo: React.FC<IProps> = ({ time, amount, date, label }) => {
  const [trackTime, setTrackTime] = useState(time);
  const [trackAmount, setTrackAmount] = useState(amount);
  const [trackDate, setTrackDate] = useState(date);

  const Container = styled.View`
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `;

  const CommontText = styled.Text`
    text-align: center;
    color: ${ThemeStyle.commonText};
    font-size: ${FontSize.xl};
  `;

  const AmountText = styled.Text`
    text-align: center;
    color: ${ThemeStyle.commonText};
    font-size: ${FontSize.xl};
    font-weight: bold;
  `;

  return (
    <Container>
      <CommontText>{trackTime}</CommontText>
      <AmountText>{amount + TRACKER_ITEMS[label].unit}</AmountText>
      <CommontText>{date}</CommontText>
    </Container>
  );
};

export default PetTrackerInfo;
