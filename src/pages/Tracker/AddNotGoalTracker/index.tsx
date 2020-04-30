import AddNotGoalTracker from "./AddNotGoalTracker";
import { connect } from "react-redux";
import { addTracker, setLoader } from "../../../redux/actions";

const mapStateToProps = state => {
  return {
    petData: state.petReducer.petData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showLoader: value => dispatch(setLoader(value)),
    addTracker: ({ ...args }) => dispatch(addTracker({ ...args }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNotGoalTracker);
