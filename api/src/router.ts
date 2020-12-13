export type Handler = (request: Request) => Promise<Response>;

type Route = {
	method: "GET" | "POST";
	path: string;
};

export default class {
	private handlers = new Map<Route, Handler>();

	private async handle(request: Request): Promise<Response> {
		const url = new URL(request.url);
		const route = Array.from(this.handlers.keys()).find(
			route => route.method == request.method && route.path == url.pathname,
		);
		const handler = this.handlers.get(route!);
		if (!handler) {
			return new Response(
				JSON.stringify({
					error: "not found",
				}),
				{
					status: 404,
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
		}
		return handler(request);
	}

	public register(route: Route, handler: Handler) {
		this.handlers.set(route, handler);
	}
	public serve() {
		addEventListener("fetch", event => {
			event.respondWith(this.handle(event.request));
		});
	}
}
