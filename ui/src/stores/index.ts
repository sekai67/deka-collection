import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import accounts from "./accounts";
import replies from "./replies";

const reducer = combineReducers({
	[accounts.name]: accounts.reducer,
	[replies.name]: replies.reducer,
});

export type State = ReturnType<typeof reducer>;
export default configureStore({ reducer });
