import AddPetProfile from "./AddPet";
import { connect } from "react-redux";
import { addPet, updatePet, setLoader } from "../../../redux/actions";
const mapStateToProps = (state) => {
  return {
    addOrEditPetLoading: state.petReducer.addPetLoading,
    petTypes: state.petReducer.petTypes,
    petData: state.petReducer.petData,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showLoader: (value) => dispatch(setLoader(value)),
    addPet: (petData, navigation, showLoader) =>
      dispatch(addPet(petData, navigation, showLoader)),
    updatePet: (petData, navigation, showLoader) =>
      dispatch(updatePet(petData, navigation, showLoader)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPetProfile);
