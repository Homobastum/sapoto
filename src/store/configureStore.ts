// Store/configureStore.js

import { createStore } from "redux";
import authInfo from "./reducers/AuthInfoReducer";

export default createStore(authInfo);
