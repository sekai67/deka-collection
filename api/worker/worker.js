/**
 * @param {Request} request
 * @param {object} headers
 */
const cors = (request, headers) => Object.assign({
	"Access-Control-Allow-Origin": "*",
}, headers);

/**
 * @param {Request} request
 * @param {string} id
 */
async function updateAccount(request, id) {
	const { get_profile } = wasm_bindgen;
	await wasm_bindgen(wasm);

	try {
		const profile = JSON.stringify(await get_profile(id));
		await ACCOUNTS.put(id, profile);

		return new Response(profile, {
			status: 200,
			headers: cors(request, {
				"Content-Type": "application/json",
			}),
		});
	} catch (e) {
		return new Response(JSON.stringify({
			"error": e,
		}), {
			status: 500,
			headers: cors(request, {
				"Content-Type": "application/json",
			}),
		});
	}

}

/**
 * @param {Request} request
 */
async function listAccounts(request) {
	const accounts = await Promise.all((await ACCOUNTS.list()).keys.map(({ name }) => ACCOUNTS.get(name, "json")));
	return new Response(JSON.stringify(accounts), {
		status: 200,
		headers: cors(request, {
			"Content-Type": "application/json",
		}),
	});
}

/**
 * @param {Request} request
 */
async function hadnle(request) {
	const url = new URL(request.url);

	if (request.method == "GET" && url.pathname == "/api/update") {
		return updateAccount(request, url.searchParams.get("id"));
	} if (request.method == "GET" && url.pathname == "/api/list") {
		return listAccounts(request);
	}

	return new Response("not found", {
		status: 404,
		headers: cors(request, {
			"Content-Type": "text/plain",
		}),
	});
}

addEventListener("fetch", event => {
	event.respondWith(hadnle(event.request));
});
