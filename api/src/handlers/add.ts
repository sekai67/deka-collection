import { getProfile } from "../profile";
import { Handler } from "../router";

export const handleAdd: Handler = async request => {
	const screen_name = new URL(request.url).searchParams.get("screen_name");
	if (!screen_name) {
		return new Response(
			JSON.stringify({
				error: "screen_name must be specified",
			}),
			{
				status: 400,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}

	try {
		const profile = JSON.stringify(await getProfile(screen_name));
		await ACCOUNTS.put(screen_name, profile);

		return new Response(profile, {
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
