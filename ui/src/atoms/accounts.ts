import { atom, selector, useSetRecoilState } from "recoil";
import { Account } from "../schema";

const apiCall = async (url: string): Promise<any> => {
	const resp = await fetch(url);
	if (!resp.ok) {
		throw new Error(`HTTP status=${resp.status}: ${await resp.text()}`);
	}
	const contentType = resp.headers.get("Content-Type");
	if (!contentType || !contentType.startsWith("application/json")) {
		throw new Error(`Unexpected content type: ${contentType}`);
	}
	return resp.json();
};

const remoteAccountsState = selector({
	key: "remoteAccountsState",
	get: async (): Promise<Account[]> => apiCall("/api/list"),
});
const localAccountsState = atom<Account[]>({
	key: "localAccountsState",
	default: [],
});
export const accountsState = selector({
	key: "accountsState",
	get: ({ get }) => {
		const accounts = new Map(
			[...get(remoteAccountsState), ...get(localAccountsState)].map(account => [account.id, account]),
		);
		return Array.from(accounts.values()).sort((a, b) =>
			a.screenName.toLowerCase().localeCompare(b.screenName.toLowerCase()),
		);
	},
});

export const useAccountRegistrar = () => {
	const setAccounts = useSetRecoilState(localAccountsState);
	return async (screenName: string) => {
		const account: Account = await apiCall(`/api/add?screen_name=${encodeURIComponent(screenName)}`);
		setAccounts(accounts => [...accounts, account]);
	};
};
