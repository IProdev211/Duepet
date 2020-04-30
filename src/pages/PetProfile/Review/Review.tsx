import React, { Component } from "react";
import { Text, Alert, BackHandler } from "react-native";
import { withNavigationFocus } from "react-navigation";

import { AppContainer, BottomContainer } from "styles/designSystem";
import ThemeStyle from "styles/theme";
import I18nContext from "translations/I18nContext";

import ProfileImage from "components/PetProfileAddImage";
import CustomInput from "components/CustomInput";
import { Down } from "components/Icons/Down";
import Button from "components/SmallButton";
import GenderSelector from "components/GenderSelector";
import BirthdayPicker from "components/BirthdayPicker";

import { Edit as EditIcon } from "components/Icons/Edit";

import {
  Container,
  EditIconContainer,
  ScrollContainer,
  AfterText
} from "./Review.style";
import { SecondaryButton } from "components/Button";

interface IProps {
  navigation: any;
  addPet: any;
  gender: number;
  addOrEditPetLoading: boolean;
  updatePet: any;
  isFocused: boolean;
  petTypes: Array<any>;
}

interface IState {
  name: string;
  initialWeight: number;
  image: any;
  type: any;
  gender: number;
  microchip_number: string;
  birth_date: any;
  editMode: boolean;
}

class ProfileReview extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      ...params
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    const { params } = props.navigation.state;
    if (params) {
      if (JSON.stringify(params) !== JSON.stringify(state)) {
        return {
          ...params
        };
      }
    }
    return null;
  };

  handleSaveButton = () => {
    const strBirthday =
      this.state.birth_date.year +
      "-" +
      ("0" + this.state.birth_date.month).slice(-2) +
      "-" +
      ("0" + this.state.birth_date.day).slice(-2);
    const birth_date = new Date(strBirthday).toISOString();

    if (this.state.editMode == true) {
      this.props.updatePet({
        ...this.state,
        birth_date: birth_date,
        initialWeight: Number(this.state.initialWeight),
        gender: Number(this.state.gender) !== 0,
        type: this.state.type.id
      });
    } else {
      this.props.addPet({
        ...this.state,
        birth_date: birth_date,
        initialWeight: Number(this.state.initialWeight),
        gender: Number(this.state.gender) !== 0,
        type: this.state.type.id
      });
    }

    if (!this.props.addOrEditPetLoading)
      this.props.navigation.navigate("PetProfile");
  };

  handleBackButton = () => {
    if (this.props.isFocused) {
      Alert.alert(
        "Exit App",
        "Exiting the application?",
        [
          {
            text: "cancel",
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => this.props.navigation.goBack()
          }
        ],
        {
          cancelable: false
        }
      );
      return true;
    }
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  render() {
    const { petTypes } = this.props;
    const strBirthday =
      ("0" + this.state.birth_date.day).slice(-2) +
      "/" +
      ("0" + this.state.birth_date.month).slice(-2) +
      "/" +
      this.state.birth_date.year;
    return (
      <AppContainer>
        <ProfileImage editable={false} image={{ uri: this.state.image.uri }} />
        <EditIconContainer>
          <EditIcon
            onPress={() => {
              this.props.navigation.push("AddPetProfile", {
                petData: { ...this.state },
                editMode: false
              });
            }}
          />
        </EditIconContainer>
        <Container>
          <ScrollContainer>
            <CustomInput
              value={this.state.name}
              label={I18nContext.getString("pet_profile_name")}
              editable={false}
              textAlignRight={true}
            />
            <CustomInput
              value={this.state.type.name}
              label={I18nContext.getString("type")}
              editable={false}
              textAlignRight={true}
            />
            <GenderSelector
              label={I18nContext.getString("gender")}
              maleSelect={this.state.gender == 1}
              editable={false}
            />
            <CustomInput
              value={this.state.initialWeight.toString()}
              label={I18nContext.getString("weight")}
              afterIcon={<AfterText>kg</AfterText>}
              editable={false}
              textAlignRight={true}
            />
            <CustomInput
              value={strBirthday}
              label={I18nContext.getString("birthday")}
              editable={false}
              textAlignRight={true}
            />
            <CustomInput
              value={this.state.microchip_number}
              label={I18nContext.getString("chip_number")}
              editable={false}
              textAlignRight={true}
            />
          </ScrollContainer>
        </Container>
        <BottomContainer>
          <SecondaryButton
            onPress={() => {
              this.handleSaveButton();
            }}
            textTransform={"uppercase"}
            width={100}
            padding={20}
            text={I18nContext.getString("save")}
          />
        </BottomContainer>
      </AppContainer>
    );
  }
}

export default withNavigationFocus(ProfileReview);
