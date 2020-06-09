import { connect } from "react-redux";

import { createProfileInjector } from "../actions/createUserProfileActions";
import CreateUserProfile from "../components/CreateUserProfile";

const mapDispatchToProps = (dispatch) => {
  return {
    boundCreateProfile: createProfileInjector(dispatch),
  };
};

export const CreateUserProfileContainer = connect(
  null,
  mapDispatchToProps
)(CreateUserProfile);

export default CreateUserProfileContainer;
