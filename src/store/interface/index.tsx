import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";


export interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  getPetTypes: any;
  getPetByUser: any;
}
