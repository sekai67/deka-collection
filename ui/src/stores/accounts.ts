import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type Account = {
	screen_name: string;
	full_name: string;
	bio: string;
};

export const fetchAccounts = createAsyncThunk(
	"accounts/fetch",
	async (): Promise<Account[]> => {
		const resp = await fetch("/api/list");
		return resp.json();
	},
);

export default createSlice({
	name: "accounts",
	initialState: {
		value: new Array<Account>(),
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchAccounts.fulfilled, (state, { payload }) => {
			state.value = payload;
		});
	},
});
