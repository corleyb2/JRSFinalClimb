import { connect } from "react-redux";
import { getUserProfileInjector } from "../actions/getUserProfileActions";
import UserProfile from "../components/UserProfile";

const mapStateToProps = (state) => {
  return {
    profile: state.getUserProfileReducer.profile,
    avatar: state.getUserProfileReducer.avatar,
    status: state.getUserProfileReducer.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    boundGetUserProfile: getUserProfileInjector(dispatch),
  };
};

const GetUserProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);

export default GetUserProfileContainer;
