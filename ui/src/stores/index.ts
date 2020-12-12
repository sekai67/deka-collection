import accounts from "./accounts";
import replies from "./replies";

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const reducer = combineReducers({
	[accounts.name]: accounts.reducer,
	[replies.name]: replies.reducer,
});
const store = configureStore({ reducer });

export type State = ReturnType<typeof reducer>;
export type Dispatch = typeof store.dispatch;

export default store;
export const useAppDispatch = () => useDispatch<Dispatch>();
