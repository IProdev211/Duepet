import Profile from "./Profile";
import { connect } from "react-redux";
import { updateUser } from "../../../redux/actions";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    updateEmail: ({ ...args }) => dispatch(updateUser({ ...args }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
