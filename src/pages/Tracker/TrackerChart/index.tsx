import TrackerChart from "./TrackerChart";
import { connect } from "react-redux";
import { deleteTracker, setLoader } from "../../../redux/actions";

const mapStateToProps = state => {
  return {
    petData: state.petReducer.petData
  };
};

const mapDispatchToProps = (dispatch, ownprops) => {
  return {
    showLoader: value => dispatch(setLoader(value)),
    deleteTracker: ({ ...args }) => dispatch(deleteTracker({ ...args }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackerChart);
