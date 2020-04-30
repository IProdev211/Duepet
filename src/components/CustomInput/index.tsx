import * as React from "react";
import ThemeStyle from "styles/theme";
import {
  CustomContainer,
  CustomLabelText,
  CustomInputContainer,
  CustomIconContainer,
  Input,
} from "styles/designSystem";
import { View } from "react-native";

export default function CustomInput(props) {
  const [placeHolder, setPlaceHolder] = React.useState(props.placeholder);
  const [value, setValue] = React.useState(props.value);

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <CustomContainer marginHz={props.marginHz}>
      {props.label && <CustomLabelText>{props.label}</CustomLabelText>}
      <CustomInputContainer
        inputBtmSpacing={props.inputBtmSpacing}
        underline={props.editable || props.underline}
      >
        {props.beforeIcon && (
          <CustomIconContainer>{props.beforeIcon}</CustomIconContainer>
        )}
        <Input
          selectionColor="white"
          beforeIcon={props.beforeIcon}
          opacity={props.opacity}
          value={value}
          secureTextEntry={props.password}
          keyboardType={props.keyboardType}
          placeholder={placeHolder}
          autoFocus={props.autoFocus}
          onFocus={() => setPlaceHolder("")}
          onBlur={() => {
            if (props.value === undefined || props.value === "") {
              setPlaceHolder(props.placeholder);
            }
          }}
          textAlignRight={props.textAlignRight}
          editable={props.editable}
          onChangeText={(text: any) => {
            setValue(text);
            props.valueChange(text, props.property);
          }}
        />
        {props.afterIcon && (
          <CustomIconContainer>{props.afterIcon}</CustomIconContainer>
        )}
      </CustomInputContainer>
      <View>{props.validationError}</View>
    </CustomContainer>
  );
}
