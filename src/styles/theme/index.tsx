import theme from "styled-theming";

const commonText = theme("mode", {
  light: "#fff",
  dark: "#fff"
});

const lightGrey = theme("mode", {
  light: "#888888",
  dark: "#888888"
})

const bottomNavigationBg = theme("mode", {
  light: "#4FBEAD",
  dark: "#4FBEAD"
});

const commonButtonBg = theme("mode", {
  light: "#216176",
  dark: "#216176"
});

const descriptionTextDark = theme("mode", {
  light: "#216176",
  dark: "#216176"
});

const descriptionTextLight = theme("mode", {
  light: "rgba(33, 97, 118, 0.6)",
  dark: "rgba(33, 97, 118, 0.6)"
});

const progressEmpty = theme("mode", {
  light: "#fff",
  dark: "#fff"
});

const progressOn = theme("mode", {
  light: "#216176",
  dark: "#216176"
});

const chartColor = theme("mode", {
  light: "#fff",
  dark: "#fff"
});

const chartBar_level_1 = theme("mode", {
  light: "#4FBEAD",
  dark: "#4FBEAD"
});

const chartBar_level_2 = theme("mode", {
  light: "#309586",
  dark: "#309586"
});

const chartBar_level_3 = theme("mode", {
  light: "#176D60",
  dark: "#176D60"
});

const chartBar_level_4 = theme("mode", {
  light: "#115A4F",
  dark: "#115A4F"
});

const chartBar_level_5 = theme("mode", {
  light: "#0C433A",
  dark: "#0C433A"
});

const backgroundWhite = theme("mode", {
  light: "#fff",
  dark: "#fff"
});

const backgroundLight = theme("mode", {
  light: "#4FBEAD",
  dark: "#4FBEAD"
});

const backgroundDark = theme("mode", {
  light: "#216176",
  dark: "#216176"
});

const underLineLight = theme("mode", {
  light: "#fff",
  dark: "#fff"
});

const underLineDark = theme("mode", {
  light: "#216176",
  dark: "#216176"
});

const imageBorderLight = theme("mode", {
  light: "#fff",
  dark: "#fff"
});

const imageBorderDark = theme("mode", {
  light: "#8791E5",
  dark: "#8791E5"
});

const placeholderTextColor = theme("mode", {
  light: "rgba(255, 255, 255, 0.3)",
  dark: "rgba(255, 255, 255, 0.3)"
});

const errorMessageText = theme("mode", {
  light: "rgba(255, 0, 0, 0.5)",
  dark: "rgba(255, 0, 0, 0.5)"
});

export default {
  commonText,
  lightGrey,
  bottomNavigationBg,
  commonButtonBg,
  descriptionTextDark,
  descriptionTextLight,
  progressEmpty,
  progressOn,
  chartColor,
  chartBar_level_1,
  chartBar_level_2,
  chartBar_level_3,
  chartBar_level_4,
  chartBar_level_5,
  backgroundWhite,
  backgroundLight,
  backgroundDark,
  underLineDark,
  underLineLight,
  imageBorderDark,
  imageBorderLight,
  placeholderTextColor,
  errorMessageText
};
