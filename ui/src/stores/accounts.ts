import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type Account = {
	screen_name: string;
	full_name: string;
	bio: string;
};

const apiCall = async (url: string): Promise<any> => {
	const resp = await fetch(url);
	if (!resp.ok) {
		throw new Error(`HTTP Error: ${resp.status}`);
	}
	const contentType = resp.headers.get("Content-Type");
	if (!contentType || !contentType.startsWith("application/json")) {
		throw new Error(`Unexpected content type: ${contentType}`);
	}
	return resp.json();
};

export const fetchAccounts = createAsyncThunk(
	"accounts/fetch",
	async (): Promise<Account[]> => {
		return apiCall("/api/list");
	},
);
export const addAccount = createAsyncThunk(
	"accounts/add",
	async (screen_name: string): Promise<Account> => {
		return apiCall(`/api/add?screen_name=${encodeURIComponent(screen_name)}`);
	},
);

const slice = createSlice({
	name: "accounts",
	initialState: {
		value: new Array<Account>(),
	},
	reducers: {},
	extraReducers: builder => {
		const compareFn = (a: Account, b: Account) =>
			a.screen_name.toLowerCase().localeCompare(b.screen_name.toLowerCase());

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
