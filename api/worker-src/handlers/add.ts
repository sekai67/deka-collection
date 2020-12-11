import { Handler } from "../router";

export const handleAdd: Handler = async request => {
	const { get_profile } = wasm_bindgen;
	await wasm_bindgen(wasm);

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
		const profile = JSON.stringify(await get_profile(screen_name));
		await ACCOUNTS.put(screen_name, profile);

		return new Response(profile, {
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
