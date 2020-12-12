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
export const addAccount = createAsyncThunk(
	"accounts/add",
	async (screen_name: string): Promise<Account> => {
		const resp = await fetch(`/api/add?screen_name=${encodeURIComponent(screen_name)}`);
		return resp.json();
	},
);

const slice = createSlice({
	name: "accounts",
	initialState: {
		value: new Array<Account>(),
	},
	reducers: {},
	extraReducers: builder => {
		const compareFn = (a: Account, b: Account) => a.screen_name.toLowerCase().localeCompare(b.screen_name.toLowerCase());

		builder.addCase(fetchAccounts.fulfilled, (state, { payload }) => {
			state.value = payload.sort(compareFn);
		});
		builder.addCase(addAccount.fulfilled, (state, { payload }) => {
			const accounts = state.value.filter(({ screen_name }) => screen_name != payload.screen_name);
			accounts.push(payload);
			state.value = accounts.sort(compareFn);
		});
	},
});

export default slice;
