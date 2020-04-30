import React, { Component } from "react";
import { View } from "react-native";
import PetImagesScrollView from "../../components/PetImagesScrollView";

const PetImages = [
  {
    image: require("../../../assets/images/animals/cat.jpg"),
    name: "Cat"
  },
  {
    image: require("../../../assets/images/animals/cute.png"),
    name: "Cute"
  },
  {
    image: require("../../../assets/images/animals/rabbit.jpg"),
    name: "Rabbit"
  },
  {
    image: require("../../../assets/images/animals/giraffe.jpg"),
    name: "Giraffe"
  },
  {
    image: require("../../../assets/images/animals/tiger.png"),
    name: "Tiger"
  },
  {
    image: require("../../../assets/images/animals/animal.png"),
    name: "Animal"
  }
];

class Reminder extends Component {
  constructor(props) {
    super(props);
  }

  handleSelectImage = selected => {
    // You can pick the selected images here.
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: 100, backgroundColor: "#4FBEAD" }}>
        <PetImagesScrollView
          source={PetImages}
          handleSelectImage={this.handleSelectImage}
        />
      </View>
    );
  }
}

export default Reminder;
