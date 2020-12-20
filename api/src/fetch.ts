import { Account } from "./kv";

type GuestActivateResponse = {
	guest_token: string;
};
type UsersShowResponse = {
	id_str: string;
	name: string;
	screen_name: string;
	description: string;
};

const headers = {
	Authorization:
		"Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
};

export const fetchAccount = async (screen_name: string): Promise<Account> => {
	const tokenResp = await fetch("https://api.twitter.com/1.1/guest/activate.json", {
		method: "POST",
		headers,
	});
	if (!tokenResp.ok) {
		throw new Error(`Failed to issue guest token, status=${tokenResp.status}`);
	}
	const { guest_token }: GuestActivateResponse = await tokenResp.json();

	const resp = await fetch(`https://api.twitter.com/1.1/users/show.json?screen_name=${screen_name}`, {
		headers: Object.assign(
			{
				"X-Guest-Token": guest_token,
			},
			headers,
		),
	});
	if (!resp.ok) {
		throw new Error(`Failed to get user info, status=${tokenResp.status}`);
	}

	const user: UsersShowResponse = await resp.json();
	return {
		screen_name: user.screen_name,
		full_name: user.name,
		bio: user.description,
	};
};
