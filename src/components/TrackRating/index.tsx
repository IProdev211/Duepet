import React, { useState } from "react";
import styled from "styled-components";
import ThemeStyle from "styles/theme";
import I18nContext from "translations/I18nContext";
import { Down } from "components/Icons/Down";
import CustomDropdownSelect from "components/CustomDropdownSelect";
import { FontSize, RespScreenHeight, RespScreenWidth } from "styles/sizes";

interface IProps {
  onChangeRating: (number) => void;
}

const TrackRating: React.FC<IProps> = ({ onChangeRating }) => {
  const [rating, setRating] = useState(1);
  const EvaluateText = styled.Text`
    color: ${ThemeStyle.commonText};
    font-size: ${FontSize.sm};
  `;

  const Container = styled.View`
    margin-top: ${RespScreenHeight(1)};
    margin-horizontal: ${RespScreenWidth(10)};
  `;

  const RatingList = styled.View`
    background-color: ${ThemeStyle.backgroundWhite};
    margin-top: ${RespScreenHeight(1)};
    height: ${RespScreenHeight(30)};
    border-radius: 20px;
    elevation: 10;
  `;
  const RatingText = styled.Text`
    color: ${ThemeStyle.commonText};
    font-size: ${FontSize.xxl};
  `;

  return (
    <Container>
      <EvaluateText>
        {I18nContext.getString("rate_evaluate_description")}
      </EvaluateText>
      <RatingText>{I18nContext.getString("rating")}</RatingText>
      <CustomDropdownSelect
        editable={false}
        defaultIndex={0}
        trackerLog={true}
        defaultValue={rating.toString()}
        afterIcon={<Down />}
        rating={true}
        onSelect={value => {
          setRating(parseInt(value) + 1);
          onChangeRating(parseInt(value) + 1);
        }}
        placeholder={I18nContext.getString("rating")}
        options={[1, 2, 3, 4, 5]}
      />
    </Container>
  );
};

export default TrackRating;
