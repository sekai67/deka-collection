import { getCachedAccounts } from "../kv";
import { Handler } from "../router";

export const handleList: Handler = async () => {
	return new Response(JSON.stringify(await getCachedAccounts()), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
