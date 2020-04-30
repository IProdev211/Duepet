import * as React from "react";
import { ImageBackground } from "react-native";
import DpTitle from "components/DpTitle";
import { Scene, BottomContainer, BgStyle } from "styles/designSystem";
import DpSubTitle from "components/DpSubTitle";
import styled from "styled-components";
import BottomText from "components/BottomText";
import Constants from "expo-constants";
import { IProps } from "store/interface";
import { PrimaryButton } from "components/Button";
import sessionService from "../../../service/sessionService";
import httpService from "service/httpService";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import I18nContext from "../../../translations/I18nContext";
import { connect } from "react-redux";
import Apis from "constants/AppApis";
import {
  getPetTypes,
  getPetByUser,
  getTrackerByUser
} from "../../../redux/actions";

const SubTitleContainer = styled.View`
  margin-top: ${hp("12%") + "px"};
`;

interface IState extends IProps {
  getPetTypes: () => {};
  getPetByUser: (value: string) => {};
  getTrackerByUser: () => void;
  showLoader: (value: boolean) => {};
  setDialog: (value: boolean) => {};
  setDialogTitle: (value: string) => {};
  setDialogContain: (value: any) => {};
  setDialogFooter: (value: boolean) => {};
  petTypesLoading: boolean;
  petLoading: boolean;
  petTypes: any;
  userPets: any;
}

class LandingPage extends React.Component<IState> {
  state = {
    showLoading: true,
    loadPage: false,
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    httpService
      .getRequest(Apis.getAppVerion)
      .then((resp: any) => {
        if (resp.settings && resp.settings.value) {
          if (Constants.manifest.version < resp.settings.value) {
            this.props.navigation.navigate("ForceUpdate");
          } else {
            this.initialRoute();
          }
        } else {
          this.initialRoute();
        }
      })
      .catch(error => {
        console.log(error);
        this.initialRoute();
      });
  }

  initialRoute = () => {
    sessionService.getStorageData("displayIntro").then(resp => {
      if (resp) {
        sessionService.getStorageData("userData").then(resp => {
          if (resp && resp.token) {
            this.props.getPetTypes();
            this.props.getTrackerByUser();
            this.props.getPetByUser(resp.id);
          } else {
            this.props.navigation.navigate("Registration");
          }
        });
      } else {
        this.setState({ showLoading: false });
      }
    });
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { petTypesLoading, petLoading } = this.props;
    if (
      prevProps.petTypesLoading !== petTypesLoading ||
      prevProps.petLoading !== petLoading
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      navigation,
      userPets,
      petTypesLoading,
      petLoading
    } = this.props;
    if (snapshot) {
      if (userPets && petTypesLoading && petLoading && !this.state.loadPage) {
        if (userPets.petsCount > 0) {
          this.setState({ loadPage: true });
          navigation.navigate("Schedule");
        } else {
          navigation.navigate("AddPetProfileTitle");
        }
      }
    }
  }

  render() {
    const { navigation } = this.props;
    if (this.state.showLoading) {
      return (
        <ImageBackground
          style={BgStyle.fullImage}
          source={require("../../../../assets/splash.png")}
        />
      );
    } else {
      return (
        <ImageBackground
          style={BgStyle.fullImage}
          source={require("../../../../assets/images/bg/bg.png")}
        >
          <Scene>
            <DpTitle
              marginTop={6}
              title={I18nContext.getString("landing_page_header")}
            />
            <SubTitleContainer>
              <DpSubTitle
                fontBold={true}
                subTitle={I18nContext.getString("landing_page_greet")}
              ></DpSubTitle>
              <DpSubTitle
                subTitle={I18nContext.getString("landing_page_introduce")}
              ></DpSubTitle>
            </SubTitleContainer>
            <PrimaryButton
              onPress={() => {
                navigation.navigate("Registration");
                sessionService.setStorageData("displayIntro", true);
              }}
              marginTop={65}
              text={I18nContext.getString("register")}
            ></PrimaryButton>
            <BottomContainer bottom={9}>
              <BottomText
                onPress={() => {
                  sessionService.setStorageData("displayIntro", true);
                  navigation.navigate("Login");
                }}
                text={I18nContext.getString("alreay_have_account")}
              />
            </BottomContainer>
          </Scene>
        </ImageBackground>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    petTypesLoading: state.petReducer.petTypesLoading,
    petLoading: state.petReducer.petLoading,
    petTypes: state.petReducer.petTypes,
    userPets: state.petReducer.userPets
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPetTypes: () => dispatch(getPetTypes()),
    getPetByUser: userid => dispatch(getPetByUser(userid)),
    getTrackerByUser: () => dispatch(getTrackerByUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
