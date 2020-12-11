import { load } from "cheerio";
import { Account } from "./kv";

export const fetchAccount = async (screenName: string): Promise<Account> => {
	const resp = await fetch(`https://mobile.twitter.com/${screenName}`);
	const $ = load(await resp.text());

	return {
		screen_name: $(".screen-name").text().trim(),
		full_name: $(".profile .fullname").text().trim(),
		bio: $(".bio").text().trim(),
	};
};
