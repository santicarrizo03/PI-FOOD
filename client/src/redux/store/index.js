import { legacy_createStore as createStore, appliMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {thunk} from "redux-thunk"

const store = createStore(
  rootReducer,
  composeWithDevTools(appliMiddleware(thunk))
);
