import React, { useState, Component } from "react";
import styled from "styled-components";
import ThemeStyle from "styles/theme";
import I18nContext from "translations/I18nContext";
import { FontSize, RespScreenHeight, RespScreenWidth } from "styles/sizes";

interface IProps {
  setNote?: (number) => void;
  text?: string;
}
const DescriptionContainer = styled.View`
  margin-top: ${RespScreenHeight(6)};
  width: ${RespScreenWidth(90)};
  height: ${RespScreenHeight(25)};
  border-radius: 15px;
  align-self: center;
  background-color: ${ThemeStyle.backgroundWhite};
  elevation: 10;
`;

const DescriptionForm = styled.TextInput`
  flex: 1;
  font-size: ${FontSize.lg};
  margin: 10px;
  text-align-vertical: top;
`;

class TrackDescriptionForm extends Component<IProps, { note: string }> {
  constructor(props) {
    super(props);

    this.state = {
      note: ""
    };
  }

  render() {
    const { setNote, text } = this.props;

    return (
      <DescriptionContainer>
        <DescriptionForm
          defaultValue={text}
          multiline
          placeholder={I18nContext.getString("add_note")}
          onChangeText={text => {
            if (text) {
              setNote(text);
            }
          }}
        />
      </DescriptionContainer>
    );
  }
}

export default TrackDescriptionForm;
