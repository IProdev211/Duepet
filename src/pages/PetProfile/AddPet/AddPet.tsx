import React, { Component } from "react";
import { Alert, BackHandler, Image, View } from "react-native";

import { AppContainer, BottomContainer } from "styles/designSystem";
import I18nContext from "translations/I18nContext";

import ProfileImage from "components/PetProfileAddImage";
import CustomInput from "components/CustomInput";
import PresentLoader from "components/DpActivityIndicator";
import GenderSelector from "components/GenderSelector";
import BirthdayPicker from "components/BirthdayPicker";
import ErrorMessage from "components/ErrorMessage";
import { Down } from "components/Icons/Down";
import {
  Container,
  ScrollContainer,
  AfterText,
  CloseButton,
} from "./AddPet.style";
import DropdownList from "components/CustomDropdownSelect";
import { NavigationEvents } from "react-navigation";
import { SecondaryButton } from "components/Button";
import moment from "moment";

interface IProps {
  navigation: any;
  getPetTypes: any;
  petTypesLoading: boolean;
  addPet: any;
  showLoader: (value) => {};
  updatePet: any;
  addOrEditPetLoading: boolean;
  petTypes: Array<any>;
}

interface IState {
  petData: any;
  isValidate: boolean;
  errorMsg: any;
  petTypes: Array<any>;
  editMode: boolean;
  selectedType: any;
  isChanged: boolean;
}

const initialState = {
  isValidate: false,
  petData: {
    name: "",
    image: { uri: "" },
    gender: "-1",
    type: {},
    birth_date: {
      day: "1",
      month: "1",
      year: "2000",
    },
    initialWeight: "",
  },
  editMode: false,
  errorMsg: {
    errorWeight: "",
  },
};

class AddPetProfile extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      petTypes: props.petTypes.slice(),
      isChanged: false,
      selectedType: {},
    };
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerLeft: null,
      headerRight: () => {
        if (!params.hasPet)
          return (
            <CloseButton
              onPress={() => {
                if (params.isChanged()) {
                  Alert.alert(
                    "You're still editing!",
                    "Are you sure you want to go to other screen?",
                    [
                      {
                        text: "cancel",
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: () => {
                          navigation.navigate("AddAction");
                        },
                      },
                    ],
                    {
                      cancelable: false,
                    }
                  );
                } else {
                  navigation.navigate("AddAction");
                }
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../../../assets/images/close/close.png")}
              />
            </CloseButton>
          );
        else return null;
      },
    };
  };

  static getDerivedStateFromProps(props, state) {
    const { params } = props.navigation.state;
    let returnState: any = {};
    if (params) {
      if (params.image) {
        if (params.image.uri != state.petData.image.uri) {
          returnState.petData = { ...state.petData, image: params.image };
          returnState.isValidate = false;
        }
      }
    }
    if (JSON.stringify(props.petTypes) != JSON.stringify(state.petTypes)) {
      returnState.petTypes = { ...props.petTypes };
      returnState.isValidate = false;
    }
    if (JSON.stringify(returnState) == "{}") return null;
    else {
      return {
        ...returnState,
      };
    }
  }

  checkChanged = () => {
    return this.state.isChanged;
  };

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = () => {
    return true;
  };

  onWillFocus = (payload) => {
    const { petData, editMode } = this.state;

    this.props.navigation.setParams({
      hasPet: this.props.petData.length === 0,
      isChanged: this.checkChanged,
    });

    const { params } = this.props.navigation.state;
    if (params) {
      let updatedState: any = {};
      if (params.petData) {
        if (JSON.stringify(params.petData) !== JSON.stringify(petData)) {
          if (params.editMode == true) {
            this.setState({
              selectedType: params.petData.type,
              isChanged: false,
            });
            updatedState.petData = {
              ...params.petData,
              image: { uri: params.petData.avatar },
              birth_date: {
                year: new Date(params.petData.birth_date)
                  .getFullYear()
                  .toString(),
                month: (
                  new Date(params.petData.birth_date).getMonth() + 1
                ).toString(),
                day: new Date(params.petData.birth_date).getDate().toString(),
              },
            };
          } else {
            updatedState.petData = { ...params.petData };
          }
        }
        if (params.editMode && params.editMode != editMode) {
          updatedState.editMode = params.editMode;
        }
      }
      if (JSON.stringify(updatedState) != "{}") {
        this.setState({
          ...updatedState,
          isValidate: false,
          isChanged: false,
        });
      }
    }
  };

  setPetData = (value, property) => {
    const object = this.state.petData;

    object[property] = value;
    this.setState({ petData: object, isChanged: true });
  };

  setGender = (maleSelect) => {
    this.setState({
      petData: { ...this.state.petData, gender: maleSelect },
      isChanged: true,
    });
  };

  setBirthday = (date) => {
    this.setState({
      petData: { ...this.state.petData, birth_date: { ...date } },
      isChanged: true,
    });
  };

  handleSaveButton = () => {
    const petData = this.state.petData;
    let isValidate = !(
      petData.name === "" ||
      petData.type.id === undefined ||
      petData.gender === "-1"
    );
    this.setState({ isValidate: true });
    if (isValidate) {
      const strBirthday =
        this.state.petData.birth_date.year +
        "-" +
        ("0" + this.state.petData.birth_date.month).slice(-2) +
        "-" +
        ("0" + this.state.petData.birth_date.day).slice(-2);
      const birth_date = new Date(strBirthday).toISOString();
      const date = moment(birth_date);
      if (this.state.editMode == true) {
        this.props.updatePet(
          {
            ...petData,
            birth_date: date.format("YYYY-MM-DD hh:mm:ss"),
            initialWeight: Number(petData.initialWeight),
            gender: Number(petData.gender) !== 0,
            type: petData.type.id,
          },
          this.props.navigation,
          this.props.showLoader
        );
      } else {
        this.props.addPet(
          {
            ...petData,
            birth_date: date.format("YYYY-MM-DD hh:mm:ss"),
            initialWeight: Number(petData.initialWeight),
            gender: Number(petData.gender) !== 0,
            type: petData.type.id,
          },
          this.props.navigation,
          this.props.showLoader
        );
      }
    }
  };

  render() {
    const { petData, isValidate, petTypes, errorMsg } = this.state;
    const petTypesList = petTypes.map((type: any) => type.name);
    return (
      <AppContainer>
        <NavigationEvents
          onWillFocus={(payload) => this.onWillFocus(payload)}
        />
        <Container behavior="padding" enabled keyboardVerticalOffset={100}>
          <ScrollContainer>
            <View
              style={{
                justifyContent: "space-around",
                flexDirection: "row",
                paddingRight: 3,
                paddingTop: 3,
              }}
            >
              <ProfileImage
                image={{ uri: petData.image.uri }}
                editable={true}
                navigation={this.props.navigation}
              />
            </View>
            <CustomInput
              value={petData.name}
              placeholder={"Pet Name"}
              toIS={I18nContext.getString("pet_profile_name")}
              valueChange={this.setPetData}
              property={"name"}
              editable
              validationError={
                isValidate && petData.name === "" ? (
                  <ErrorMessage
                    text={I18nContext.getString("required_pet_name")}
                  />
                ) : null
              }
            />
            <DropdownList
              label={"type"}
              leftSide={"true"}
              defaultValue={this.state.selectedType.name}
              afterIcon={<Down />}
              onSelect={(value) => {
                this.setState({ selectedType: petTypes[value] });
                this.setPetData(petTypes[value], "type");
              }}
              options={petTypesList}
              editable={false}
              validationError={
                isValidate && petData.type.id === undefined ? (
                  <ErrorMessage
                    text={I18nContext.getString("required_pet_type")}
                  />
                ) : null
              }
            />
            <BirthdayPicker
              label={I18nContext.getString("birthday")}
              value={{ ...petData.birth_date }}
              valueChange={this.setBirthday}
              editable
            />
            <GenderSelector
              label={I18nContext.getString("gender")}
              maleSelect={petData.gender}
              valueSelectChange={this.setGender}
              editable
              validationError={
                isValidate && petData.gender === "-1" ? (
                  <ErrorMessage
                    text={I18nContext.getString("required_pet_gender")}
                  />
                ) : null
              }
            />
            <CustomInput
              value={petData.microchip_number}
              label={I18nContext.getString("chip_number")}
              property={"microchip_number"}
              keyboardType={"number-pad"}
              afterIcon={
                <AfterText>{I18nContext.getString("optional")}</AfterText>
              }
              valueChange={this.setPetData}
              editable
            />
          </ScrollContainer>
        </Container>
        <PresentLoader />
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

export default AddPetProfile;
