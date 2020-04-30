import Review from "./Review";
import { addPet, updatePet } from "../../../redux/actions";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    addOrEditPetLoading: state.petReducer.addPetLoading,
    petTypes: state.petReducer.petTypes
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addPet: (petData, navigation, showLoader) => dispatch(addPet(petData, navigation, showLoader)),
    updatePet: (petData, navigation, showLoader) => dispatch(updatePet(petData, navigation, showLoader))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
