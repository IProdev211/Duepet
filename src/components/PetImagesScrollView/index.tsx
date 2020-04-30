import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import { View, Image, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import { FontSize, RespScreenWidth } from "../../styles/sizes";
import { TouchableOpacity } from "react-native-gesture-handler";
import ThemeStyle from "styles/theme";
import _ from "lodash";

interface Props {
  source?: any;
  onPress?: any;
  petData?: any;
  multiple?: boolean;
  allOption?: boolean;
  tracker?: boolean;
  defaultSelect?: number;
  handleSelectImage?: (selected, item) => void;
}

const PetContainer = styled(View)`
  align-items: center;
  margin-left: ${RespScreenWidth(2)};
  margin-right: ${RespScreenWidth(2)};
`;

const ImageContainer = styled(TouchableOpacity)`
  width: ${RespScreenWidth(22)};
  height: ${RespScreenWidth(23)};
  border-radius: ${RespScreenWidth(22)};
  align-items: center;
  justify-content: center;
  elevation: 3;
`;

const Circle = styled(View)`
  width: ${RespScreenWidth(25)};
  height: ${RespScreenWidth(25)};
  border-radius: ${RespScreenWidth(22)};
  border-width: 3px;
  border-color: ${(props) => (props.border ? "white" : "transparent")};
  align-items: center;
`;

const PetImage = styled(Image)`
  width: ${RespScreenWidth(21)};
  height: ${RespScreenWidth(21)};
  border-radius: ${RespScreenWidth(22)};
  background-color: ${ThemeStyle.backgroundWhite};
  resize-mode: cover;
  margin: auto;
`;

const PetView = styled(View)`
  width: ${RespScreenWidth(21)};
  height: ${RespScreenWidth(21)};
  border-radius: ${RespScreenWidth(22)};
  background-color: ${ThemeStyle.backgroundLight};
  margin: auto;
`;
const PetText = styled(Text)`
  font-size: ${FontSize.lg};
  margin: auto;
  color: ${ThemeStyle.commonText};
`;

const PetName = styled(Text)`
  font-size: ${FontSize.sm};
  color: ${ThemeStyle.commonText};
`;

interface IState {
  selected?: boolean[];
  selectedPet: number;
}

const PetImagesScrollView: React.FC<Props> = ({
  source,
  onPress,
  petData,
  multiple,
  allOption,
  handleSelectImage,
  defaultSelect,
  tracker,
}) => {
  const [selectedPet, setSelectedPet] = useState(
    defaultSelect !== undefined ? defaultSelect : 0
  );
  const [allPet, setPetData] = useState(petData);

  const handleImageSelect = (index, item) => {
    if (!multiple) {
      setSelectedPet(index);
      handleSelectImage(index, item);
    }
    if (multiple) {
      const petIds = [];
      const changeData = [...allPet];
      if (changeData[index].selected === undefined) {
        changeData[index].selected = true;
      } else {
        changeData[index].selected = !changeData[index].selected;
      }
      changeData.map((item) => {
        if (item.selected) {
          petIds.push(item.id);
        }
      });
      handleSelectImage(index, petIds);
      setPetData(changeData);
    }
  };

  useEffect(() => {
    if (!multiple) {
      setPetData(petData);
    }
  }, [petData]);

  useEffect(() => {
    setSelectedPet(defaultSelect);
  }, [defaultSelect]);

  useEffect(() => {
    if (multiple) {
      const index = allPet.findIndex((x) => x.name === "all");

      if (index !== -1) {
        const data = [...allPet];
        data.splice(index, 1);
        data.map((item, index) => {
          data[index].selected = false;
        });
        setPetData(data);
      }
    }
    if (!multiple) {
      const index = allPet.findIndex((x) => x.name === "all");
      if (index === -1) {
        if (!allOption) {
          const data = [...allPet];
          data.splice(0, 0, {
            name: "all",
            avatar:
              "https://api.duepet.com/api/pets/avatars/default_avatar.jpg",
            id: "test",
          });
          setPetData(data);
        } else {
          setPetData(petData);
        }
      }
    }
  });

  return (
    <FlatList
      renderItem={({ item, index }) => (
        <PetContainer key={index}>
          <Circle
            border={multiple ? item.selected === true : selectedPet === index}
          >
            {item && item.name === "all" ? (
              <ImageContainer
                onPress={() => {
                  handleImageSelect(index, item);
                }}
              >
                <PetView>
                  <PetText>ALL</PetText>
                </PetView>
              </ImageContainer>
            ) : (
              <ImageContainer
                onPress={() => {
                  handleImageSelect(index, item);
                }}
              >
                <PetImage source={{ uri: item.avatar }} key={index} />
              </ImageContainer>
            )}
          </Circle>
          {item && item.name !== "all" ? <PetName>{item.name}</PetName> : null}
        </PetContainer>
      )}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item: any) => item.id.toString()}
      data={
        tracker
          ? allPet.filter(
              (pet) => pet.petActiveTrackersCount !== 0
            )
          : allPet
      }
      // data={allPet}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    petData: state.petReducer.petData,
  };
};

const mapDispatchToProps = (dispatch, ownprops) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PetImagesScrollView);
