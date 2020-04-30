import React, { Component } from "react";
import { View, Animated, Easing, Alert } from "react-native";
import styled from "styled-components";
import { ActionPanel } from "../Icons/ActionPanel";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const Background = styled(View)`
  position: absolute;
  margin-top: ${-wp("6%") + "px"};
  align-self: center;
  align-items: center;
  justify-content: center;
`;

interface IProps {
  onPress: any;
  navigation: any;
  isOpen: boolean;
}
interface IState {
  isOpen: boolean;
  spinValue: any;
}

class AddButton extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
      spinValue: props.isOpen ? new Animated.Value(0) : new Animated.Value(1)
    };
  }

  handlePress = () => {
    const { state } = this.props.navigation;
    const currentScreen = state.routes[state.index];
    const route = currentScreen.routes[currentScreen.index];
    const { isOpen, spinValue } = this.state;
    if (route.routeName === "AddPetProfile") {
      if (route.params.isChanged()) {
        Alert.alert(
          "You're still editing!",
          "Are you sure you want to go to other screen?",
          [
            {
              text: "cancel",
              style: "cancel"
            },
            {
              text: "OK",
              onPress: () => {
                Animated.timing(spinValue, {
                  toValue: isOpen ? 1 : 0,
                  duration: 300,
                  easing: Easing.linear,
                  useNativeDriver: true
                }).start(() => {
                  this.setState({ isOpen: !isOpen });
                  this.props.onPress(isOpen);
                });
              }
            }
          ],
          {
            cancelable: false
          }
        );
      }
    } else {
      Animated.timing(spinValue, {
        toValue: isOpen ? 1 : 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(() => {
        this.setState({ isOpen: !isOpen });
        this.props.onPress(isOpen);
      });
    }
  };

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "-45deg"]
    });

    return (
      <Background>
        <Animated.View>
          <ActionPanel
            onPress={this.handlePress}
            style={{ transform: [{ rotate: spin }] }}
          />
        </Animated.View>
      </Background>
    );
  }
}

export default AddButton;
