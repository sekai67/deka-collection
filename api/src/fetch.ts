import { load } from "cheerio";
import { Account } from "./kv";

export const fetchAccount = async (screenName: string): Promise<Account> => {
	const resp = await fetch(`https://mobile.twitter.com/${screenName}`);
	if (!resp.ok) {
		throw new Error(`HTTP Error: ${resp.status}`);
	}

	const $ = load(await resp.text());
	const account = {
		screen_name: $(".screen-name").text().trim(),
		full_name: $(".profile .fullname").text().trim(),
		bio: $(".bio").text().trim(),
	};

	if (!account.screen_name) {
		throw new Error(`Failed to parse profile`);
	}
	return account;
};
