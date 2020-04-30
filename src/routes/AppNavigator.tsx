import React from "react";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import LandingPage from "pages/Auth/LandingPage";
import Login from "pages/Auth/Login";
import Registration from "pages/Auth/Registration";
import ThankYou from "pages/Auth/ThankYou";
import ForgotPassword from "pages/Auth/ForgotPassword";
import Done from "pages/Auth/Done";
import Profile from "pages/Auth/Profile";
import ChangePassword from "pages/Auth/ChangePassword";
import Tracker from "pages/Tracker";
import SingleTracker from "pages/Tracker/SingleTracker";
import AddTracker from "pages/Tracker/AddTracker";
import Schedule from "pages/Schedule";
import Label from "pages/Label";
import AddAction from "pages/AddActionPanel";
import AddLabel from "pages/Label/AddLabel";
import EditLabel from "pages/Label/EditLabel";
import AddReminder from "pages/Reminder/AddReminder";
import AddFeedback from "pages/Feedback/AddFeedback";
import PetProfile from "pages/PetProfile";
import AddPetProfileTitle from "pages/PetProfile/Title";
import AddPetProfile from "pages/PetProfile/AddPet";
import ProfileReview from "pages/PetProfile/Review";
import ProfileGallery from "pages/PetProfile/Gallery";
import Support from "pages/Setting/Support";
import Setting from "pages/Setting";
import TrackerChart from "pages/Tracker/TrackerChart";
import GoalOrientedLog from "pages/Tracker/GoalOrientedLog";
import GoalOrientedLogEdit from "pages/Tracker/GoalOrientedLogEdit";
import TrackLog from "pages/Tracker/TrackLog";
import AddGoalTracker from "pages/Tracker/AddGoalTracker";
import AddNotGoalTracker from "pages/Tracker/AddNotGoalTracker";
import ReminderDashboard from "pages/Reminder/Dashboard";

import BottomNavigator from "components/BottomNavigator";
import { Left as BackIcon } from "components/Icons/Left";
import ThemeVariables from "styles/themeVariables";
import ForceUpdate from "pages/Auth/ForceUpdate";
import { CloseButton } from "styles/designSystem";

let app;
app = {} || app;

const AuthNavigator = createStackNavigator(
  {
    LandingPage: { screen: LandingPage },
    Registration: { screen: Registration },
    Login: { screen: Login },
    ThankYou: { screen: ThankYou },
    ForgotPassword: { screen: ForgotPassword },
    Done: { screen: Done },
    ForceUpdate: { screen: ForceUpdate }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerShown: false
    },
    defaultNavigationOptions: {
      gestureEnabled: false
    }
  }
);

const HomeStack = createStackNavigator(
  {
    Trackers: { screen: Tracker },
    AddTracker: { screen: AddTracker },
    TrackerChart: { screen: TrackerChart },
    GoalOrientedLog: { screen: GoalOrientedLog },
    GoalOrientedLogEdit: { screen: GoalOrientedLogEdit },
    AddGoalTracker: { screen: AddGoalTracker },
    AddNotGoalTracker: { screen: AddNotGoalTracker },
    TrackLog: { screen: TrackLog },
    Schedule: {
      screen: ReminderDashboard,
      navigationOptions: {
        headerLeft: null
      }
    },
    SingleTracker: { screen: SingleTracker },
    PetProfile: { screen: PetProfile },
    AddPetProfileTitle: { screen: AddPetProfileTitle },
    AddPetProfile: { screen: AddPetProfile },
    ProfileReview: { screen: ProfileReview },
    AddFeedback: { screen: AddFeedback },
    AddReminder: { screen: AddReminder },
    UpdateReminder: { screen: AddReminder },
    Label: { screen: Label },
    AddLabel: { screen: AddLabel },
    EditLabel: { screen: EditLabel },
    AddAction: { screen: AddAction },
    Setting: { screen: Setting },
    Support: { screen: Support },
    Gallery: { screen: ProfileGallery },
    Profile: { screen: Profile },
    ChangePassword: { screen: ChangePassword }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        title: "DuePet",
        gestureEnabled: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 24
        },
        headerLeft: null,
        headerRight: () => {
          const routeName = navigation.state.routeName;
          return routeName !== "Schedule" &&
            routeName !== "PetProfile" &&
            routeName !== "Setting" ? (
            <CloseButton
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../assets/images/close/close.png")}
              />
            </CloseButton>
          ) : null;
        },

        headerStyle: {
          backgroundColor:
            ThemeVariables["light"].appBackgourndGradientStartColor
        },
        headerTintColor: ThemeVariables["light"].commonText
      };
    }
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  app.visible =
    routeName === "Gallery" ||
    routeName === "AddPetProfileTitle" ||
    routeName === "AddPetProfile" ||
    routeName === "ProfileReview";
};

const TabNavigator = createBottomTabNavigator(
  {
    HomeStack
  },
  {
    navigationOptions: {
      headerShown: false
    },
    tabBarComponent: ({ navigation }) => {
      return <BottomNavigator navigation={navigation} />;
    },
    defaultNavigationOptions: () => {
      return {
        tabBarVisible: !app.visible
      };
    }
  }
);

const MainNavigator = createStackNavigator(
  {
    Auth: AuthNavigator,
    Home: TabNavigator
  },
  {
    defaultNavigationOptions: {
      gestureEnabled: false
    }
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;
