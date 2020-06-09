import { connect } from "react-redux";

import { createClimbInjector } from "../actions/createClimbActions";
import CreateClimb from "../components/CreateClimb";

const mapDispatchToProps = (dispatch) => {
  console.log("in map dispatch to props");
  return {
    boundCreateClimb: createClimbInjector(dispatch),
  };
};

export const CreateClimbContainer = connect(
  null,
  mapDispatchToProps
)(CreateClimb);

export default CreateClimbContainer;
