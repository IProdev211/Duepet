import React, { Component } from "react";
import { PlusIconForTitle } from "components/Icons/PlusIconForTitle";
import Title from "components/AddPetProfileTitle";
import { AppContainer } from "styles/designSystem";
import UnlockFeatureDescription from "components/UnlockFeatureDescription";
import PlusIconView from "./Title.style";

interface IProps {
  navigation: any;
}

class AddPetProfile extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  // static navigationOptions = ({ navigate }) => {
  //   title: "Add Pet profile";
  // };

  render() {
    return (
      <AppContainer>
        <PlusIconView>
          <PlusIconForTitle
            onPress={() =>
              this.props.navigation.navigate("AddPetProfile", {
                petData: {
                  name: "",
                  image: { uri: "" },
                  gender: "-1",
                  type: {},
                  birth_date: {
                    day: "1",
                    month: "1",
                    year: "2000"
                  },
                  initialWeight: ""
                },
                editMode: false
              })
            }
          />
        </PlusIconView>
        <Title title="Add Pet Profile" />
        <UnlockFeatureDescription />
      </AppContainer>
    );
  }
}

export default AddPetProfile;
