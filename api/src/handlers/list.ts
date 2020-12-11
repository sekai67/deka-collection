import { getCachedAccounts } from "../kv";
import { Handler } from "../router";

export const handleList: Handler = async () => {
	try {
		return new Response(JSON.stringify(await getCachedAccounts()), {
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
