import { combineReducers } from "redux";

import { createUserProfileReducer } from "./createUserProfileReducer";
import { createClimbReducer } from "./createClimbReducer";

const totalReducer = combineReducers({
  createUserProfileReducer,
  createClimbReducer,
});

export const rootReducer = (state, action) => {
  // if (action.type === "LOGOUT") {
  //     state = undefined;
  //   }
  return totalReducer(state, action);
};
