import AddTracker from "./AddTracker";

import { connect } from "react-redux";
import { createTrackerLog, setDialog, setDialogTitle, setDialogContain, setDialogFooter } from "../../../redux/actions";

const mapStateToProps = state => {
    return {
      petData: state.petReducer.petData
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      createTrackerLog: ({ ...args }) => dispatch(createTrackerLog({ ...args })),
      setDialog: value => dispatch(setDialog(value)),
      setDialogTitle: value => dispatch(setDialogTitle(value)),
      setDialogContain: value => dispatch(setDialogContain(value)),
      setDialogFooter: value => dispatch(setDialogFooter(value))
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddTracker);
