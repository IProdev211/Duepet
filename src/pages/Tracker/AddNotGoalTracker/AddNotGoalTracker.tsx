import React, { Component } from "react";
import { AppContainer, TitleView } from "styles/designSystem";
import PageTitle from "components/PageTitle";
import I18nContext from "translations/I18nContext";
import TrackLogCheckButton from "components/TrackLogCheckButton";
import {
  ImageContainer,
  PetImage,
  PetName,
  NoteText
} from "./AddNotGoalTracker.style";
import PresentLoader from "components/DpActivityIndicator";
import { SafeAreaView, StatusBar, Image } from "react-native";
import { CloseButton } from "pages/Setting/Support/Support.style";

interface IProps {
  navigation: any;
  petData: Array<any>;
  showLoader: () => {};
  addTracker: (object) => void;
}

class AddNotGoalTracker extends Component<IProps> {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    headerShown: false
  };

  render() {
    const { navigation, petData, addTracker } = this.props;
    const params = navigation.state.params || {};
    return (
      <AppContainer>
        <SafeAreaView
          style={{
            marginTop: StatusBar.currentHeight,
            justifyContent: "center",
            flexDirection: "row"
          }}
        >
          <TitleView>
            <PageTitle title={I18nContext.getString("duepet")} />
          </TitleView>
          <CloseButton
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Image
              source={require("../../../../assets/images/close/close.png")}
            />
          </CloseButton>
        </SafeAreaView>
        <ImageContainer>
          <PetImage source={{ uri: petData[params.petIndex].avatar }} />
          <PetName>{petData[params.petIndex].name}</PetName>
        </ImageContainer>
        <NoteText>
          {I18nContext.getString("create_" + params.label + "_tracker")}
        </NoteText>
        <TrackLogCheckButton
          onPressCheck={() => {
            if (params.type === "Goal") {
              navigation.navigate("AddGoalTracker", {
                label: params.label,
                petIndex: params.petIndex
              });
            } else {
              addTracker({
                pet_id: petData[params.petIndex].id,
                note: "",
                goal_value: "",
                label: params.label,
                navigation,
                showLoader: this.props.showLoader
              });
            }
          }}
          onPressCancel={() => {
            navigation.pop();
          }}
        />
        <PresentLoader />
      </AppContainer>
    );
  }
}

export default AddNotGoalTracker;
