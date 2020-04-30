import * as React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components";
import ThemeStyle from "styles/theme";
import { FontSize } from "styles/sizes";

const BackButton = props => {
  return (
    <TouchableOpacity onPress={() => props.navigation.pop()}>
      <Icon name="arrow-back" />
    </TouchableOpacity>
  );
}

const Icon = styled(MaterialIcons)`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.lg};
`;
export default BackButton;
