import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import accounts from "./accounts";

const reducer = combineReducers({
	[accounts.name]: accounts.reducer,
});

export type State = ReturnType<typeof reducer>;
export default configureStore({ reducer });
