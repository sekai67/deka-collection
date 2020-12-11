import { load } from "cheerio";

export type Profile = {
	screen_name: string;
	full_name: string;
	bio: string;
};

export const getProfile = async (screenName: string): Promise<Profile> => {
	const resp = await fetch(`https://mobile.twitter.com/${screenName}`);
	const $ = load(await resp.text());

	return {
		screen_name: $(".screen-name").text().trim(),
		full_name: $(".profile .fullname").text().trim(),
		bio: $(".bio").text().trim(),
	};
};
