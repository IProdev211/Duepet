import React, { Component } from "react";
import styled from "styled-components";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import ThemeStyle from "styles/theme";
import { DownDark as Down } from "components/Icons/DownDark";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { RespScreenHeight } from "styles/sizes";

const Item = styled(MenuItem)``;
interface Props {
  actions: Array<String>;
  handleAction: any;
  setting?: boolean;
}

class MoreDot extends Component<Props, { menuItemTexts: Array<String> }> {
  constructor(props) {
    super(props);
    this.state = {
      menuItemTexts: this.props.actions
    };
    this._menu = null;
  }

  handleButtonPress = () => {
    this.showMenu();
  };

  setMenuRef = ref => {
    this._menu = ref;
  };

  showMenu() {
    this._menu.show();
  }

  hideMenu() {
    this._menu.hide();
  }

  handleItemPress(index) {
    this.hideMenu();
    this.props.handleAction(index);
  }

  render() {
    const ButtonContainer = styled(TouchableOpacity)`
      width: ${wp("8%") + "px"};
      height: ${wp("8%") + "px"};
      border-radius: ${wp("4%") + "px"};
      align-items: center;
      justify-content: center;
    `;

    const ItemView = styled.View`
      width: ${wp("70%") + "px"};
    `;
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Menu
          ref={this.setMenuRef}
          style={{
            borderRadius: 10,
            paddingTop: 9,
            paddingBottom: 2
          }}
          button={
            <ButtonContainer onPress={this.handleButtonPress}>
              {!this.props.setting && (
                <Image
                  source={require("../../../assets/images/more/more.png")}
                />
              )}
              {this.props.setting && (
                <Image
                  source={require("../../../assets/images/arrow_down_dark/arrow_down_dark.png")}
                />
              )}
            </ButtonContainer>
          }
        >
          {this.state.menuItemTexts.map((itemText, index) => {
            console;
            return (
              <ItemView>
                <Item
                  textStyle={{
                    fontSize: hp("2.5%"),
                    textAlign: "center",
                    color: ThemeStyle.descriptionTextDark
                  }}
                  onPress={this.handleItemPress.bind(this, index)}
                >
                  {itemText}
                </Item>
                <MenuDivider />
              </ItemView>
            );
          })}
        </Menu>
      </View>
    );
  }
}

export default MoreDot;
