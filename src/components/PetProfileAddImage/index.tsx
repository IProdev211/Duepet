import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components";
import ThemeStyle from "styles/theme";
import I18nContext from "translations/I18nContext";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";
import { PetProfileAddImage as AddIcon } from "../Icons/PetProfileAddImage";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

interface IProps {
  navigation?: any;
  editable: boolean;
  image: any;
  onPress?: any;
}

interface IState {
  image: any;
  editable: boolean;
}

const Container = styled(View)`
  margin-top: ${RespScreenHeight(3)};
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;

const ImageContainer = styled(TouchableOpacity)`
  width: ${RespScreenWidth(30)};
  height: ${RespScreenWidth(30)};
  border-radius: ${RespScreenWidth(30)};
  align-items: center;
  justify-content: center;
`;

const PetImage = styled(Image)`
  width: ${RespScreenWidth(30)};
  height: ${RespScreenWidth(30)};
  border-width: 3px;
  border-color: ${ThemeStyle.imageBorderLight};
  border-radius: ${RespScreenWidth(30)};
  background-color: ${ThemeStyle.backgroundWhite};
  resize-mode: cover;
`;

class PetProfileAddImage extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      image: props.image,
      editable: props.editable
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.image != state.image) {
      return {
        image: props.image
      };
    }
    return null;
  }

  handleOpenGallery = async () => {
    if (this.props.editable == true) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5
        });
        if (!result.cancelled) {
          this.props.navigation.navigate("AddPetProfile", {
            image: result,
            petData: null
          });
        }
      } else {
        throw new Error("Location permission not granted");
      }
    }
  };

  render() {
    return (
      <Container>
        {this.state.image.uri === "" && (
          <ImageContainer onPress={this.handleOpenGallery}>
            <Image
              source={require("../../../assets/images/uploadImage/petprofile_addimage.png")}
            />
          </ImageContainer>
        )}
        {this.state.image.uri !== "" && (
          <ImageContainer onPress={this.handleOpenGallery}>
            <PetImage source={this.state.image} />
          </ImageContainer>
        )}
      </Container>
    );
  }
}

export default PetProfileAddImage;
