import { KeyValueStore } from ".";
import { Account } from "../schema";

declare const ACCOUNTS: KVNamespace;

export default new KeyValueStore<Account, Account["id"]>(
	ACCOUNTS,
	"@",
	"$cache",
	a => (!a ? "" : a.id),
	(a, b) => (!a || !b ? 0 : a.screenName.toLowerCase().localeCompare(b.screenName.toLowerCase())),
);
