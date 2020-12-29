import { combineReducers } from "redux";

import UIReducer from "./UiReducer";
import complianceReducer from './complianceReduce';

export default combineReducers({
  ui: UIReducer,
  complianceReducer
});
