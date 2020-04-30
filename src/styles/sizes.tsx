import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

export enum FontSize {
  xxxs = hp("1%") + "px", //8
  xxs = hp("1.23%") + "px", //10
  xs = hp("1.47%") + "px", //12
  sm = hp("1.72%") + "px", //14
  md = hp("2%") + "px", //16
  lg = hp("2.46%") + "px", //20
  xl = hp("3%") + "px", //25
  xxl = hp("3.32%") + "px", //27
  xxxl = hp("4%") + "px", //32
  xxxxl = hp("5%") + "px" //40
}

export const RespScreenHeight = percent => {
  return hp(percent + "%") + "px";
};

export const RespScreenWidth = percent => {
  return wp(percent + "%") + "px";
};
