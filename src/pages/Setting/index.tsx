import Setting from "./Setting";
import { connect } from "react-redux";
import { updateUser } from "../../redux/actions";

const mapStateToProps = state => ({
  addOrEditingUserLoading: state.addOrEditingUserLoading
});
const mapDispatchToProps = dispatch => ({
  updateUser: userInfo => {
    dispatch(updateUser(userInfo));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
