import GoalOrientedLogEdit from "./GoalOrientedLogEdit";
import { connect } from "react-redux";
import { updateTracker } from "../../../redux/actions";

const mapStateToProps = state => {
  return {
    petData: state.petReducer.petData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTracker: ({ ...args }) => dispatch(updateTracker({ ...args }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalOrientedLogEdit);
