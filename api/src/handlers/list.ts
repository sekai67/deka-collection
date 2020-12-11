import { Profile } from "../profile";
import { Handler } from "../router";

export const handleList: Handler = async () => {
	try {
		const accounts = await Promise.all((await ACCOUNTS.list()).keys.map(({ name }) => ACCOUNTS.get<Profile>(name, "json")));
		return new Response(JSON.stringify(accounts), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			error = error.message;
		}
		return new Response(JSON.stringify({ error }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
};
