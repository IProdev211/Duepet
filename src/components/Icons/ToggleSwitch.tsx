import React, { useState, useEffect } from "react";
import { withTheme } from "styled-components";
import SwitchToggle from "react-native-switch-toggle";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import ThemeVariables from "styles/themeVariables";
import { useTheme } from "../../../themeContext";

interface ITheme {
  mode: string;
}

interface IProps {
  onToggle: any;
  isOn: boolean;
  theme: ITheme;
  isTheme?: boolean;
}

const ToggleSwitch: React.FC<IProps> = ({ onToggle, isOn, isTheme, theme }) => {
  let [isToggleOn, setIsOn] = useState(isOn);
  let themeToggle = useTheme();

  return (
    <SwitchToggle
      switchOn={isTheme ? theme.mode === "light" : isToggleOn}
      backgroundColorOff={ThemeVariables[theme.mode].backgroundDark}
      backgroundColorOn={ThemeVariables[theme.mode].backgroundDark}
      circleColorOff={ThemeVariables[theme.mode].backgroundWhite}
      circleColorOn={ThemeVariables[theme.mode].backgroundWhite}
      duration={200}
      containerStyle={{
        width: wp("15%"),
        height: wp("15%") / 2,
        borderRadius: wp("15%") / 4,
        padding: 5
      }}
      circleStyle={{
        width: wp("15%") / 2 - 2,
        height: wp("15%") / 2 - 2,
        borderRadius: (wp("15%") / 2 - 2) / 2
      }}
      onPress={() => {
        onToggle(theme.mode === "light", themeToggle);
        if (!isTheme) {
          setIsOn(!isToggleOn);
        }
        return true;
      }}
    />
  );
};

export default withTheme(ToggleSwitch);
