import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { users, errorMessageOfUsers, fetchOfUser, starredRepo, fetchOfRepo } from "../containers/UserPage/reducer";

const rootReducer = combineReducers({
  users,
  errorMessageOfUsers,
  fetchOfUser,
  starredRepo,
  fetchOfRepo,
  routing: routerReducer
});

export default rootReducer
