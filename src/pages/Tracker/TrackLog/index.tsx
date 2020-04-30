import TrackLog from "./TrackLog";
import { connect } from "react-redux";
import { createTrackerLog, setLoader } from "../../../redux/actions";

const mapStateToProps = (state) => {
  return {
    petData: state.petReducer.petData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTrackerLog: ({ ...args }) => dispatch(createTrackerLog({ ...args })),
    showLoader: (value) => dispatch(setLoader(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackLog);
