import React, { Component } from "react";
import { View, Image } from "react-native";
import styled from "styled-components";
import ThemeStyle from "styles/theme";
import { RespScreenWidth, RespScreenHeight } from "styles/sizes";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Permissions from "expo-permissions";
import { Upload } from "components/Icons/Upload";

interface IProps {
  navigation?: any;
  editable?: boolean;
  image: any;
  onPress?: any;
}

interface IState {
  image: any;
  editable: boolean;
}

const Container = styled(View)`
  margin-top: ${RespScreenHeight(5)};
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

const ImageContainer = styled(TouchableOpacity)`
  width: ${RespScreenWidth(50)};
  height: ${RespScreenWidth(30)};
  border-radius: ${RespScreenWidth(5)};
  align-items: center;
  justify-content: center;
  elevation: 3;
  align-self: center;
`;

const ScreenShot = styled(Image)`
  width: ${RespScreenWidth(50)};
  height: ${RespScreenWidth(30)};
  border-width: 3px;
  border-color: ${ThemeStyle.imageBorderLight};
  border-radius: ${RespScreenWidth(5)};
  background-color: ${ThemeStyle.backgroundWhite};
  resize-mode: cover;
`;

class ScreenShotImage extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      image: props.image
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
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      this.props.navigation.navigate("Gallery", {
        from: "Support"
      });
    } else {
      throw new Error("Location permission not granted");
    }
  };

  render() {
    return (
      <Container>
        {this.state.image.uri === "" && (
          <Upload onPress={this.handleOpenGallery} />
        )}
        {this.state.image.uri !== "" && (
          <ImageContainer onPress={this.handleOpenGallery}>
            <ScreenShot source={this.state.image} />
          </ImageContainer>
        )}
      </Container>
    );
  }
}

export default ScreenShotImage;
