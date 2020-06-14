import { combineReducers } from "redux";

import { createUserProfileReducer } from "./createUserProfileReducer";
import { getUserProfileReducer } from "./getUserProfileReducer";

const totalReducer = combineReducers({
  createUserProfileReducer,
  getUserProfileReducer,
});

export const rootReducer = (state, action) => {
  // if (action.type === "LOGOUT") {
  //     state = undefined;
  //   }
  return totalReducer(state, action);
};
