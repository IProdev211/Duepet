import Support from "./Support";
import { uploadScreenshot } from "../../../redux/actions";
import { connect } from "react-redux";

const mapStateTopProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    uploadScreenshot: payload => dispatch(uploadScreenshot(payload))
  };
};

export default connect(mapStateTopProps, mapDispatchToProps)(Support);
