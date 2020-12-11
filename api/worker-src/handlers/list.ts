import { Handler } from "../router";

export const handleList: Handler = async request => {
	try {
		const accounts = await Promise.all((await ACCOUNTS.list()).keys.map(({ name }) => ACCOUNTS.get(name, "json")));
		return new Response(JSON.stringify(accounts), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (e) {
		return new Response(
			JSON.stringify({
				error: e,
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}
};
