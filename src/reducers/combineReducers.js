import { combineReducers } from "redux";

import { createUserProfileReducer } from "./createUserProfileReducer";

const totalReducer = combineReducers({
  createUserProfileReducer,
});

export const rootReducer = (state, action) => {
  // if (action.type === "LOGOUT") {
  //     state = undefined;
  //   }
  return totalReducer(state, action);
};
