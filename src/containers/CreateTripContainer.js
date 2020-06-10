import { connect } from "react-redux";

import { createTripInjector } from "../actions/createTripActions";
import CreateTrip from "../components/CreateTrip";

const mapDispatchToProps = (dispatch) => {
  return {
    boundCreateTrip: createTripInjector(dispatch),
  };
};

const CreateTripContainer = connect(null, mapDispatchToProps)(CreateTrip);

export default CreateTripContainer;
