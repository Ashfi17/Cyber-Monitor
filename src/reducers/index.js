import { combineReducers } from "redux";

import UIReducer from "./UiReducer";

export default combineReducers({
  ui: UIReducer
});
