import Tracker from "./Tracker";
import { connect } from "react-redux";
import { getTrackerByPet, deleteTracker, setLoader } from "../../redux/actions";

const mapStateToProps = state => {
  return {
    petData: state.petReducer.petData,
    trackerData: state.trackerReducer.trackerData,
    currentPetTracker: state.trackerReducer.currentPetTracker,
    activeTrackerCount: state.trackerReducer.activeTrackerCount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showLoader: value => dispatch(setLoader(value)),
    getTrackerByPet: petId => dispatch(getTrackerByPet(petId)),
    deleteTracker: ({ ...args }) => dispatch(deleteTracker({ ...args }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracker);
