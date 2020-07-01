import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
import entitiesReducer from "./entities_reducer";
import errorsReducer from "./errors_reducer";
import subscriptionReducer from './subscription_reducer'
import ui from "./ui_reducer";

const rootReducer = combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
  errors: errorsReducer,
  subscription: subscriptionReducer,
  ui,
});

export default rootReducer;
