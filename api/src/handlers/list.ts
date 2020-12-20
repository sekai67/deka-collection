import AccountStore from "../kv/accounts";
import { Handler } from "../router";

export const handleList: Handler = async () => {
	const resp = JSON.stringify(await AccountStore.getAll());
	return new Response(resp, {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
