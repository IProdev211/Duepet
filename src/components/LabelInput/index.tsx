import * as React from "react";
import styled from "styled-components";
import { View, Text, TextInput } from "react-native";
import ThemeStyle from "styles/theme";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";

const InputContainer = styled(View)`
  flex: 1;
  border-bottom-width: 1px;
  border-color: ${ThemeStyle.backgroundWhite};
  padding-left: ${RespScreenWidth(3)};
  padding-bottom: ${RespScreenHeight(0.5)};
`;

const Input = styled(TextInput)`
  color: ${ThemeStyle.commonText};
  font-size: ${FontSize.xxl};
`;

const Label = styled(Text)`
  font-size: ${FontSize.xxl};
  color: ${ThemeStyle.commonText};
`;

const Container = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-horizontal: ${RespScreenWidth(6)};
`;
export default function LabelInput(props) {
  const [placeHolder, setPlaceHolder] = React.useState(props.placeholder);
  const [value, setValue] = React.useState(props.value);
  return (
    <Container>
      <Label>{props.label}</Label>
      <InputContainer>
        <Input
          value={props.value}
          selectionColor="white"
          onChangeText={(text: any) => {
            setValue(text);
            props.valueChange(text, props.property);
          }}
          placeholder={placeHolder}
          keyboardType={props.keyboardType}
          onFocus={() => setPlaceHolder("")}
          autoFocus={props.autoFocus}
          onBlur={() => {
            if (value === undefined || value === "") {
              setPlaceHolder(props.placeholder);
            }
          }}
        />
      </InputContainer>
      {props.after && <Label>{props.after}</Label>}
    </Container>
  );
}
