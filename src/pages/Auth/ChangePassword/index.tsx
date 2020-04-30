import ChangePassword from "./ChangePassword";
import { connect } from "react-redux";
import { updateUser } from "../../../redux/actions";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    updatePassword: ({ ...args }) => dispatch(updateUser({ ...args }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
