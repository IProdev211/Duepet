import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import ThemeStyle from "styles/theme";
import { connect } from "react-redux";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";
import Carousel from "react-native-snap-carousel";
import _ from "lodash";

interface IProps {
  getCurrentIndex?: (number) => void;
  petData?: Array<any>;
  width?: any;
}
const PetsCarousel: React.FC<IProps> = ({
  getCurrentIndex,
  petData,
  width
}) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState(petData);

  const PetItemWrapper = styled.View`
    height: ${RespScreenHeight(20)};
    width: ${RespScreenWidth(30)};
    justify-content: center;
    align-items: center;
  `;

  const PetImageWrapper = styled.View`
    width: ${width ? RespScreenWidth(width) : RespScreenWidth(30)};
    height: ${width ? RespScreenWidth(width) : RespScreenWidth(30)};
  `;

  const PetImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
  `;

  const PetName = styled.Text`
    color: ${ThemeStyle.commonText};
    margin-top: ${RespScreenHeight(0.5)};
  `;

  useEffect(() => {
    setData(petData);
  }, [petData]);

  useEffect(() => {
    getCurrentIndex(currentIndex);
  }, [currentIndex]);

  const RenderPets = ({ item, index }) => {
    return (
      <PetItemWrapper key={item.id}>
        <PetImageWrapper>
          <PetImage
            source={{ uri: item.avatar }}
            imageStyle={{
              borderRadius: wp(30 / 2),
              backgroundColor: "rgba(200, 200, 200, 0.8)"
            }}
          />
        </PetImageWrapper>
        <PetName>{item.name}</PetName>
      </PetItemWrapper>
    );
  };

  return (
    <Carousel
      ref={carouselRef}
      data={_.filter(data, pet => pet.name !== "all")}
      renderItem={RenderPets}
      sliderWidth={wp(100)}
      itemWidth={wp(30)}
      enableMomentum={true}
      inactiveSlideScale={0.6}
      inactiveSlideOpacity={0.4}
      inactiveSlideShift={-10}
      firstItem={0}
      onSnapToItem={index => {
        setCurrentIndex(index);
      }}
    />
  );
};

const mapStateToProps = state => {
  return {
    petData: state.petReducer.petData
  };
};

const mapDispatchToProps = (dispatch, ownprops) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PetsCarousel);
