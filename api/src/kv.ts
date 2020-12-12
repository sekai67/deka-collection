declare const ACCOUNTS: KVNamespace;

export type Account = {
	screen_name: string;
	full_name: string;
	bio: string;
};

const CACHE_KEY = "#cache";

const getAccount = (key: string) => ACCOUNTS.get<Account>(key, "json");
const getAccounts = async () => {
	const { keys } = await ACCOUNTS.list();
	return Promise.all(keys.filter(({ name }) => name != CACHE_KEY).map(({ name }) => getAccount(name)));
};

export const getCachedAccounts = async () => {
	const result = await ACCOUNTS.get<Account[]>(CACHE_KEY, "json");
	if (!result) {
		return getAccounts();
	}
	return result;
};
export const putAccount = async (value: Account) => {
	const accounts = (await getAccounts())
		.filter(account => account && account.screen_name != value.screen_name)
		.concat([value])
		.sort((a, b) => (!a || !b ? 0 : a.screen_name.toLowerCase().localeCompare(b.screen_name.toLowerCase())));

	await Promise.all([ACCOUNTS.put(value.screen_name, JSON.stringify(value)), ACCOUNTS.put(CACHE_KEY, JSON.stringify(accounts))]);
};
