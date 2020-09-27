import { load } from "cheerio";
import fetch from "node-fetch";

type Profile = {
	name: string;
	screenName: string;
	bio: string;
};

export const getUserProfile = async (id: string): Promise<Profile> => {
	const resp = await fetch(`https://mobile.twitter.com/${id}`);
	const $ = load(await resp.text());

	return {
		name: $(".profile .fullname").text().trim(),
		screenName: $(".screen-name").text().trim(),
		bio: $(".bio").text().trim(),
	};
};
