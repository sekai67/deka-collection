import { KeyValueStore } from ".";

declare const ACCOUNTS: KVNamespace;

export type Account = {
	id: string;
	name: string;
	screenName: string;
	description: string;
};

export default new KeyValueStore<Account, Account["id"]>(
	ACCOUNTS,
	"@",
	"$cache",
	a => (!a ? "" : a.id),
	(a, b) => (!a || !b ? 0 : a.screenName.toLowerCase().localeCompare(b.screenName.toLowerCase())),
);
